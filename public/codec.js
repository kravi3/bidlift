/**
 * BidLift Zero-Server URL Codec & Image Optimizer
 * Encodes entire interactive proposals into compressed `#q=...` URL fragments
 * so zero client/business PII ever touches a backend server.
 */
window.BidLiftCodec = (function () {
  function bytesToBase64Url(bytes) {
    let binary = "";
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlToBytes(b64u) {
    let b64 = b64u.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function minifyProposal(p) {
    return {
      v: 1,
      bn: p.businessName || "",
      bt: p.businessTagline || "",
      be: p.businessEmail || "",
      bp: p.businessPhone || "",
      ld: p.logoData || "",
      pi: p.paletteId || "navy-gold",
      cb: p.customBrandColor || "",
      cn: p.clientName || "",
      pt: p.projectTitle || "",
      pl: p.projectLocation || "",
      vd: Number(p.validDays) || 7,
      fad: Number(p.fastActionDiscount) || 0,
      fah: Number(p.fastActionHours) || 48,
      dp: Number(p.depositPercent) || 0,
      pp: p.paymentProvider || "stripe",
      plnk: p.paymentLink || "",
      pn: p.paymentNote || "",
      tr: p.terms || "",
      st: Boolean(p.singleTierMode),
      rt: Number(p.recommendedTierIndex ?? 1),
      ct: Number(p.createdAt || Date.now()),
      wh: Boolean(p.whiteLabel),
      ti: (p.tiers || []).map((t) => ({
        n: t.name || "",
        s: t.subtitle || "",
        p: Number(t.price) || 0,
        d: t.timeline || "",
        f: Array.isArray(t.features) ? t.features : []
      })),
      ad: (p.addons || []).map((a) => ({
        id: a.id || "",
        t: a.title || "",
        d: a.description || "",
        p: Number(a.price) || 0,
        s: Boolean(a.selected)
      }))
    };
  }

  function expandProposal(m) {
    if (!m || typeof m !== "object") return null;
    // Support un-minified objects as well
    if (m.tiers && Array.isArray(m.tiers)) return m;
    return {
      id: m.id || "shared",
      businessName: m.bn || "",
      businessTagline: m.bt || "",
      businessEmail: m.be || "",
      businessPhone: m.bp || "",
      logoData: m.ld || "",
      paletteId: m.pi || "navy-gold",
      customBrandColor: m.cb || "",
      clientName: m.cn || "",
      projectTitle: m.pt || "",
      projectLocation: m.pl || "",
      validDays: m.vd ?? 7,
      fastActionDiscount: m.fad ?? 0,
      fastActionHours: m.fah ?? 48,
      depositPercent: m.dp ?? 0,
      paymentProvider: m.pp || "stripe",
      paymentLink: m.plnk || "",
      paymentNote: m.pn || "",
      terms: m.tr || "",
      singleTierMode: Boolean(m.st),
      recommendedTierIndex: m.rt ?? 1,
      createdAt: m.ct || Date.now(),
      whiteLabel: Boolean(m.wh),
      tiers: Array.isArray(m.ti)
        ? m.ti.map((t) => ({
            name: t.n || "",
            subtitle: t.s || "",
            price: Number(t.p) || 0,
            timeline: t.d || "",
            features: Array.isArray(t.f) ? t.f : []
          }))
        : [],
      addons: Array.isArray(m.ad)
        ? m.ad.map((a, idx) => ({
            id: a.id || `addon-${idx}`,
            title: a.t || "",
            description: a.d || "",
            price: Number(a.p) || 0,
            selected: Boolean(a.s)
          }))
        : []
    };
  }

  async function compressStream(bytes, format) {
    const cs = new CompressionStream(format);
    const writer = cs.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(cs.readable).arrayBuffer();
    return new Uint8Array(buf);
  }

  async function decompressStream(bytes, format) {
    const ds = new DecompressionStream(format);
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(buf);
  }

  async function encodeProposal(proposalObj) {
    const minified = minifyProposal(proposalObj);
    const jsonStr = JSON.stringify(minified);
    const utf8Bytes = new TextEncoder().encode(jsonStr);

    if (typeof CompressionStream === "function") {
      try {
        const compressed = await compressStream(utf8Bytes, "deflate-raw");
        return "z1_" + bytesToBase64Url(compressed);
      } catch (e) {
        // Fall through to plain base64url
      }
    }
    return "b1_" + bytesToBase64Url(utf8Bytes);
  }

  async function decodeProposal(encodedStr) {
    if (!encodedStr || typeof encodedStr !== "string") return null;
    try {
      const clean = encodedStr.trim();
      if (clean.startsWith("z1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const decompressed = await decompressStream(raw, "deflate-raw");
        const jsonStr = new TextDecoder().decode(decompressed);
        return expandProposal(JSON.parse(jsonStr));
      }
      if (clean.startsWith("b1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const jsonStr = new TextDecoder().decode(raw);
        return expandProposal(JSON.parse(jsonStr));
      }
      // Fallback attempt raw base64url json
      const raw = base64UrlToBytes(clean);
      const jsonStr = new TextDecoder().decode(raw);
      return expandProposal(JSON.parse(jsonStr));
    } catch (err) {
      console.warn("[BidLiftCodec] Failed to decode proposal link:", err);
      return null;
    }
  }

  /**
   * Downscale an uploaded logo image file to a lightweight Data URL (max 160px, ~<=8KB)
   * so URL hashes remain compact and shareable across SMS / WhatsApp / Email.
   */
  function downscaleLogoFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith("image/")) {
        reject(new Error("Please upload a valid image file (PNG, JPG, WebP, or SVG)."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Unable to read image file."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Unable to parse uploaded image."));
        img.onload = () => {
          const maxDim = 160;
          let w = img.width || maxDim;
          let h = img.height || maxDim;
          if (w > maxDim || h > maxDim) {
            const ratio = Math.min(maxDim / w, maxDim / h);
            w = Math.max(1, Math.round(w * ratio));
            h = Math.max(1, Math.round(h * ratio));
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          // Try WebP first (supports alpha + tiny size), fall back to JPEG
          let dataUrl = canvas.toDataURL("image/webp", 0.72);
          if (!dataUrl.startsWith("data:image/webp") || dataUrl.length > 10500) {
            // Draw onto white background for clean JPEG
            const jpgCanvas = document.createElement("canvas");
            jpgCanvas.width = w;
            jpgCanvas.height = h;
            const jctx = jpgCanvas.getContext("2d");
            jctx.fillStyle = "#ffffff";
            jctx.fillRect(0, 0, w, h);
            jctx.drawImage(img, 0, 0, w, h);
            dataUrl = jpgCanvas.toDataURL("image/jpeg", 0.75);
            if (dataUrl.length > 10500) {
              dataUrl = jpgCanvas.toDataURL("image/jpeg", 0.55);
            }
          }
          resolve(dataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  return {
    encodeProposal,
    decodeProposal,
    downscaleLogoFile
  };
})();
