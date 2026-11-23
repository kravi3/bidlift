/**
 * BidLift Zero-Server URL Codec & Image Optimizer
 * Encodes entire interactive proposals into compressed `#q=...` URL fragments
 * so zero client/business PII ever touches a backend server.
 */
window.BidLiftCodec = (function () {
  const MAX_ENCODED_CHARS = 32000;

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
      v: 2,
      bn: String(p.businessName || "").slice(0, 120),
      bt: String(p.businessTagline || "").slice(0, 180),
      be: String(p.businessEmail || "").slice(0, 120),
      bp: String(p.businessPhone || "").slice(0, 60),
      ld: String(p.logoData || "").slice(0, 12000),
      pi: String(p.paletteId || "navy-gold").slice(0, 40),
      cb: String(p.customBrandColor || "").slice(0, 20),
      cu: String(p.currency || "USD").slice(0, 6),
      tx: Math.min(50, Math.max(0, Number(p.taxRate) || 0)),
      txl: String(p.taxLabel || "Sales Tax").slice(0, 40),
      qn: String(p.quoteNumber || "").slice(0, 40),
      cn: String(p.clientName || "").slice(0, 120),
      pt: String(p.projectTitle || "").slice(0, 160),
      pl: String(p.projectLocation || "").slice(0, 160),
      in: String(p.introText || "").slice(0, 600),
      rb: String(p.recommendedBadge || "Most Popular Choice").slice(0, 40),
      tb: Array.isArray(p.trustBadges)
        ? p.trustBadges.slice(0, 3).map((b) => String(b || "").slice(0, 60))
        : [],
      vd: Math.min(365, Math.max(1, Number(p.validDays) || 7)),
      fad: Math.max(0, Number(p.fastActionDiscount) || 0),
      fah: Math.min(720, Math.max(1, Number(p.fastActionHours) || 48)),
      dp: Math.min(100, Math.max(0, Number(p.depositPercent) || 0)),
      pp: String(p.paymentProvider || "stripe").slice(0, 30),
      plnk: String(p.paymentLink || "").slice(0, 400),
      pn: String(p.paymentNote || "").slice(0, 300),
      tr: String(p.terms || "").slice(0, 1000),
      st: Boolean(p.singleTierMode),
      rt: Math.max(0, Math.min(2, Number(p.recommendedTierIndex ?? 1))),
      ct: Number(p.createdAt || Date.now()),
      wh: Boolean(p.whiteLabel),
      fe: Boolean(p.financingEnabled),
      fm: Math.min(180, Math.max(3, Number(p.financingMonths) || 60)),
      fa: p.financingApr === undefined ? 9.99 : Math.min(36, Math.max(0, Number(p.financingApr) || 0)),
      fu: String(p.financingUrl || "").slice(0, 400),
      ti: (Array.isArray(p.tiers) ? p.tiers : []).slice(0, 3).map((t) => ({
        n: String(t.name || "").slice(0, 80),
        s: String(t.subtitle || "").slice(0, 140),
        p: Math.max(0, Number(t.price) || 0),
        d: String(t.timeline || "").slice(0, 50),
        ac: Boolean(t.autoCalcPrice),
        f: (Array.isArray(t.features) ? t.features : []).slice(0, 15).map((f) => String(f || "").slice(0, 180)),
        li: (Array.isArray(t.lineItems) ? t.lineItems : []).slice(0, 15).map((it) => ({
          n: String(it.name || "").slice(0, 100),
          c: String(it.category || "").slice(0, 40),
          q: Math.max(0, Number(it.qty) ?? 1),
          u: String(it.unit || "").slice(0, 24),
          r: Math.max(0, Number(it.unitPrice) || 0),
          d: String(it.note || "").slice(0, 180)
        }))
      })),
      ad: (Array.isArray(p.addons) ? p.addons : []).slice(0, 25).map((a) => ({
        id: String(a.id || "").slice(0, 40),
        t: String(a.title || "").slice(0, 100),
        d: String(a.description || "").slice(0, 220),
        c: String(a.category || "").slice(0, 40),
        q: Math.max(1, Number(a.qty) || 1),
        u: String(a.unit || "").slice(0, 24),
        p: Math.max(0, Number(a.price) || 0),
        s: Boolean(a.selected)
      }))
    };
  }

  function expandProposal(m) {
    if (!m || typeof m !== "object") return null;
    if (m.tiers && Array.isArray(m.tiers)) {
      return {
        ...m,
        tiers: m.tiers.slice(0, 3).map((t) => ({
          ...t,
          autoCalcPrice: Boolean(t.autoCalcPrice),
          features: Array.isArray(t.features) ? t.features.slice(0, 15) : [],
          lineItems: Array.isArray(t.lineItems) ? t.lineItems.slice(0, 15) : []
        })),
        addons: (Array.isArray(m.addons) ? m.addons : []).slice(0, 25).map((a) => ({
          ...a,
          category: String(a.category || ""),
          qty: Math.max(1, Number(a.qty) || 1),
          unit: String(a.unit || "")
        }))
      };
    }
    const tiers = Array.isArray(m.ti)
      ? m.ti.slice(0, 3).map((t) => ({
          name: String(t.n || ""),
          subtitle: String(t.s || ""),
          price: Math.max(0, Number(t.p) || 0),
          timeline: String(t.d || ""),
          autoCalcPrice: Boolean(t.ac),
          features: Array.isArray(t.f) ? t.f.slice(0, 15).map((f) => String(f || "")) : [],
          lineItems: Array.isArray(t.li)
            ? t.li.slice(0, 15).map((it) => ({
                name: String(it.n || ""),
                category: String(it.c || "Included Service"),
                qty: Math.max(0, Number(it.q) ?? 1),
                unit: String(it.u || "job"),
                unitPrice: Math.max(0, Number(it.r) || 0),
                note: String(it.d || "")
              }))
            : []
        }))
      : [];
    if (tiers.length === 0) return null;

    return {
      id: "shared",
      businessName: String(m.bn || ""),
      businessTagline: String(m.bt || ""),
      businessEmail: String(m.be || ""),
      businessPhone: String(m.bp || ""),
      logoData: String(m.ld || ""),
      paletteId: String(m.pi || "navy-gold"),
      customBrandColor: String(m.cb || ""),
      currency: String(m.cu || "USD"),
      taxRate: Math.min(50, Math.max(0, Number(m.tx) || 0)),
      taxLabel: String(m.txl || "Sales Tax"),
      quoteNumber: String(m.qn || ""),
      clientName: String(m.cn || ""),
      projectTitle: String(m.pt || ""),
      projectLocation: String(m.pl || ""),
      introText: String(m.in || ""),
      recommendedBadge: String(m.rb || "Most Popular Choice"),
      trustBadges: Array.isArray(m.tb) ? m.tb.slice(0, 3).map((b) => String(b || "")) : [],
      validDays: m.vd ?? 7,
      fastActionDiscount: m.fad ?? 0,
      fastActionHours: m.fah ?? 48,
      depositPercent: m.dp ?? 0,
      paymentProvider: String(m.pp || "stripe"),
      paymentLink: String(m.plnk || ""),
      paymentNote: String(m.pn || ""),
      terms: String(m.tr || ""),
      singleTierMode: Boolean(m.st),
      recommendedTierIndex: Math.min(tiers.length - 1, Math.max(0, Number(m.rt ?? 1))),
      createdAt: Number(m.ct) || Date.now(),
      whiteLabel: Boolean(m.wh),
      financingEnabled: Boolean(m.fe),
      financingMonths: Math.min(180, Math.max(3, Number(m.fm) || 60)),
      financingApr: m.fa === undefined ? 9.99 : Math.min(36, Math.max(0, Number(m.fa) || 0)),
      financingUrl: String(m.fu || ""),
      tiers,
      addons: Array.isArray(m.ad)
        ? m.ad.slice(0, 25).map((a, idx) => ({
            id: String(a.id || `addon-${idx}`),
            title: String(a.t || ""),
            description: String(a.d || ""),
            category: String(a.c || ""),
            qty: Math.max(1, Number(a.q) || 1),
            unit: String(a.u || ""),
            price: Math.max(0, Number(a.p) || 0),
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
    if (encodedStr.length > MAX_ENCODED_CHARS) {
      console.warn("[BidLiftCodec] Encoded proposal payload exceeds safe limit.");
      return null;
    }
    try {
      const clean = encodedStr.trim();
      if (clean.startsWith("z1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const decompressed = await decompressStream(raw, "deflate-raw");
        if (decompressed.byteLength > 120000) return null;
        const jsonStr = new TextDecoder().decode(decompressed);
        return expandProposal(JSON.parse(jsonStr));
      }
      if (clean.startsWith("b1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const jsonStr = new TextDecoder().decode(raw);
        return expandProposal(JSON.parse(jsonStr));
      }
      const raw = base64UrlToBytes(clean);
      const jsonStr = new TextDecoder().decode(raw);
      return expandProposal(JSON.parse(jsonStr));
    } catch (err) {
      console.warn("[BidLiftCodec] Failed to decode proposal link:", err);
      return null;
    }
  }

  /**
   * Downscale an uploaded logo image file to a lightweight raster Data URL (max 160px)
   * using canvas re-encoding (automatically strips any SVG scripts and shrinks URL size).
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

          let dataUrl = canvas.toDataURL("image/webp", 0.72);
          if (!dataUrl.startsWith("data:image/webp") || dataUrl.length > 10500) {
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
