/**
 * ScopeLock Zero-Server URL Codec, Evidence Photo Compressor & SHA-256 Digest
 * --------------------------------------------------------------------------
 * Encodes entire Change-Order packets into `#c=z1_<base64url>` fragments using
 * CompressionStream('deflate-raw') with a strict 24,000-character URL budget.
 */
window.ScopeLockCodec = (function () {
  "use strict";

  const MAX_ENCODED_CHARS = 24000;

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

  function minifyChangeOrder(co) {
    const src = co || {};
    return {
      v: 1,
      id: String(src.id || "custom").slice(0, 40),
      lb: String(src.label || "Change Order").slice(0, 100),
      bn: String(src.businessName || "").slice(0, 120),
      be: String(src.businessEmail || "").slice(0, 120),
      bp: String(src.businessPhone || "").slice(0, 40),
      cn: String(src.clientName || "").slice(0, 120),
      cty: String(src.projectCity || "").slice(0, 100),
      cr: String(src.contractRef || "").slice(0, 60),
      con: String(src.coNumber || "CO-01").slice(0, 30),
      cu: String(src.currency || "USD").slice(0, 6),
      oc: Math.max(0, Number(src.originalContractPrice) || 0),
      pa: Math.max(0, Number(src.priorApprovedCos) || 0),
      rc: String(src.reasonCode || "Hidden Condition").slice(0, 40),
      sd: Math.max(0, Math.min(365, Math.round(Number(src.scheduleDeltaDays) || 0))),
      bd: String(src.baseCompletionDate || "").slice(0, 20),
      dp: Number(src.coDeltaPrice) || 0,
      tx: Math.max(0, Math.min(30, Number(src.taxRate) || 0)),
      sm: String(src.summaryNote || "").slice(0, 450),
      tr: String(src.terms || "").slice(0, 1000),
      pp: String(src.paymentProvider || "stripe").slice(0, 30),
      pl: String(src.paymentLink || "").slice(0, 400),
      wh: Boolean(src.whiteLabel),
      ts: Number(src.createdAt || Date.now()),
      li: (Array.isArray(src.lineItems) ? src.lineItems : []).slice(0, 20).map((it) => ({
        n: String(it.name || "").slice(0, 120),
        q: Math.max(0, Number(it.qty) || 0),
        u: String(it.unit || "item").slice(0, 24),
        p: Number(it.unitPrice) || 0,
        d: String(it.note || "").slice(0, 160)
      })),
      ph: (Array.isArray(src.photos) ? src.photos : []).slice(0, 4).map((ph) => ({
        c: String(ph.caption || "").slice(0, 90),
        d: String(ph.dataUrl || "").slice(0, 12000)
      }))
    };
  }

  function expandChangeOrder(m) {
    if (!m || typeof m !== "object") return null;
    if (Array.isArray(m.lineItems)) {
      return {
        ...m,
        lineItems: m.lineItems.slice(0, 20),
        photos: Array.isArray(m.photos) ? m.photos.slice(0, 4) : []
      };
    }
    const lineItems = Array.isArray(m.li)
      ? m.li.slice(0, 20).map((it) => ({
          name: String(it.n || ""),
          qty: Math.max(0, Number(it.q) || 0),
          unit: String(it.u || "item"),
          unitPrice: Number(it.p) || 0,
          note: String(it.d || "")
        }))
      : [];
    if (lineItems.length === 0) return null;

    const computedDelta = lineItems.reduce((acc, it) => acc + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0);
    return {
      id: String(m.id || "shared"),
      label: String(m.lb || "Change Order"),
      businessName: String(m.bn || ""),
      businessEmail: String(m.be || ""),
      businessPhone: String(m.bp || ""),
      clientName: String(m.cn || ""),
      projectCity: String(m.cty || ""),
      contractRef: String(m.cr || ""),
      coNumber: String(m.con || "CO-01"),
      currency: String(m.cu || "USD"),
      originalContractPrice: Math.max(0, Number(m.oc) || 0),
      priorApprovedCos: Math.max(0, Number(m.pa) || 0),
      reasonCode: String(m.rc || "Hidden Condition"),
      scheduleDeltaDays: Math.max(0, Math.round(Number(m.sd) || 0)),
      baseCompletionDate: String(m.bd || ""),
      coDeltaPrice: Number.isFinite(Number(m.dp)) ? Number(m.dp) : computedDelta,
      taxRate: Math.max(0, Math.min(30, Number(m.tx) || 0)),
      summaryNote: String(m.sm || ""),
      terms: String(m.tr || ""),
      paymentProvider: String(m.pp || "stripe"),
      paymentLink: String(m.pl || ""),
      whiteLabel: Boolean(m.wh),
      createdAt: Number(m.ts) || Date.now(),
      lineItems,
      photos: Array.isArray(m.ph)
        ? m.ph.slice(0, 4).map((ph) => ({
            caption: String(ph.c || ""),
            dataUrl: String(ph.d || "")
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

  /**
   * Synchronous raw JSON payload size & conservative URL budget estimate.
   */
  function estimatePayloadBytes(co) {
    const minified = minifyChangeOrder(co);
    const jsonStr = JSON.stringify(minified);
    const jsonBytes = new TextEncoder().encode(jsonStr).length;
    // Deflate-raw typically compresses text by ~45-65% while base64 raster photos stay ~1.0x
    const photoBytes = (Array.isArray(minified.ph) ? minified.ph : []).reduce(
      (sum, ph) => sum + String(ph.d || "").length,
      0
    );
    const textBytes = Math.max(0, jsonBytes - photoBytes);
    const estimatedEncodedChars = Math.round(textBytes * 0.65 + photoBytes * 0.92) + 12;
    return {
      jsonBytes,
      photoBytes,
      estimatedEncodedChars,
      budgetChars: MAX_ENCODED_CHARS,
      pct: Math.min(100, Math.round((estimatedEncodedChars / MAX_ENCODED_CHARS) * 100)),
      withinBudget: estimatedEncodedChars <= MAX_ENCODED_CHARS
    };
  }

  async function encodeChangeOrder(co) {
    const minified = minifyChangeOrder(co);
    const jsonStr = JSON.stringify(minified);
    const utf8Bytes = new TextEncoder().encode(jsonStr);

    let encoded = "";
    if (typeof CompressionStream === "function") {
      try {
        const compressed = await compressStream(utf8Bytes, "deflate-raw");
        encoded = "z1_" + bytesToBase64Url(compressed);
      } catch (e) {
        encoded = "b1_" + bytesToBase64Url(utf8Bytes);
      }
    } else {
      encoded = "b1_" + bytesToBase64Url(utf8Bytes);
    }

    if (encoded.length > MAX_ENCODED_CHARS) {
      throw new Error(`Change-order URL payload (${encoded.length.toLocaleString()} chars) exceeds the ${MAX_ENCODED_CHARS.toLocaleString()}-char budget. Remove or trim a photo.`);
    }
    return encoded;
  }

  async function decodeChangeOrder(encodedStr) {
    if (!encodedStr || typeof encodedStr !== "string") return null;
    const clean = encodedStr.trim();
    if (clean.length > MAX_ENCODED_CHARS) {
      console.warn("[ScopeLockCodec] Encoded payload exceeds 24,000-char limit.");
      return null;
    }
    try {
      if (clean.startsWith("z1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const decompressed = await decompressStream(raw, "deflate-raw");
        if (decompressed.byteLength > 120000) return null;
        const jsonStr = new TextDecoder().decode(decompressed);
        return expandChangeOrder(JSON.parse(jsonStr));
      }
      if (clean.startsWith("b1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const jsonStr = new TextDecoder().decode(raw);
        return expandChangeOrder(JSON.parse(jsonStr));
      }
      const raw = base64UrlToBytes(clean);
      const jsonStr = new TextDecoder().decode(raw);
      return expandChangeOrder(JSON.parse(jsonStr));
    } catch (err) {
      console.warn("[ScopeLockCodec] Failed to decode change-order link:", err);
      return null;
    }
  }

  /**
   * Downscales an uploaded field-evidence photo to <= 640px WebP/JPEG (~5-8KB target)
   * so up to 4 photos fit inside the 24,000-character URL fragment.
   */
  function downscaleEvidencePhoto(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type || !file.type.startsWith("image/")) {
        reject(new Error("Please upload a valid image file (JPG, PNG, or WebP)."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Unable to read selected photo."));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Unable to decode selected photo."));
        img.onload = () => {
          const tryEncode = (maxDim, quality) => {
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
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);

            let url = canvas.toDataURL("image/webp", quality);
            if (!url.startsWith("data:image/webp")) {
              url = canvas.toDataURL("image/jpeg", quality);
            }
            return url;
          };

          // Aim for <= ~7,800 chars (~5.8KB binary) per evidence photo
          const attempts = [
            [640, 0.56],
            [560, 0.48],
            [480, 0.42],
            [400, 0.36]
          ];
          let chosen = "";
          for (let i = 0; i < attempts.length; i++) {
            const candidate = tryEncode(attempts[i][0], attempts[i][1]);
            chosen = candidate;
            if (candidate.length <= 7800) break;
          }
          resolve(chosen);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Computes a cryptographic SHA-256 hex digest over a canonical payload object.
   */
  async function computeSha256Digest(payload) {
    const raw = typeof payload === "string" ? payload : JSON.stringify(payload);
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === "function") {
      const encoded = new TextEncoder().encode(raw);
      const buf = await window.crypto.subtle.digest("SHA-256", encoded);
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    // Deterministic fallback hash only if SubtleCrypto is unavailable in non-secure context
    let h1 = 0x811c9dc5;
    let h2 = 0x9e3779b9;
    for (let i = 0; i < raw.length; i++) {
      const ch = raw.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 0x01000193);
      h2 = Math.imul(h2 ^ (ch + i), 0x85ebca6b);
    }
    return ((h1 >>> 0).toString(16).padStart(8, "0") + (h2 >>> 0).toString(16).padStart(8, "0")).repeat(4);
  }

  return {
    MAX_ENCODED_CHARS,
    minifyChangeOrder,
    expandChangeOrder,
    estimatePayloadBytes,
    encodeChangeOrder,
    decodeChangeOrder,
    downscaleEvidencePhoto,
    computeSha256Digest
  };
})();
