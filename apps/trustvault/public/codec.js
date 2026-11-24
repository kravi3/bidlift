/**
 * TrustVault Zero-Server Trust Portal Codec, Logo Optimizer & SHA-256 Attestation Digest
 * Encodes entire interactive Trust Portals into compressed `#t=z1_...` URL fragments.
 */
window.TrustVaultCodec = (function () {
  "use strict";

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

  function minifyPortal(p) {
    const pillarsObj = {};
    if (p.pillarSummaries && typeof p.pillarSummaries === "object") {
      Object.keys(p.pillarSummaries).slice(0, 8).forEach((k) => {
        pillarsObj[String(k).slice(0, 32)] = String(p.pillarSummaries[k] || "").slice(0, 420);
      });
    }

    return {
      v: 1,
      pr: String(p.presetId || "saas").slice(0, 32),
      co: String(p.company || "").slice(0, 120),
      dm: String(p.domain || "").slice(0, 120),
      se: String(p.securityEmail || "").slice(0, 120),
      tg: String(p.tagline || "").slice(0, 220),
      hr: String(p.hostingRegion || "").slice(0, 100),
      cf: String(p.complianceFrame || "").slice(0, 120),
      ld: String(p.logoData || "").slice(0, 12000),
      bg: (Array.isArray(p.badges) ? p.badges : []).slice(0, 8).map((b) => String(b || "").slice(0, 48)),
      ps: pillarsObj,
      sp: (Array.isArray(p.subprocessors) ? p.subprocessors : []).slice(0, 20).map((s) => ({
        n: String(s.name || "").slice(0, 80),
        p: String(s.purpose || "").slice(0, 140),
        l: String(s.location || "").slice(0, 80),
        d: String(s.dpaStatus || "DPA Executed").slice(0, 40)
      })),
      wh: Boolean(p.whiteLabel),
      ua: Number(p.updatedAt || Date.now())
    };
  }

  function expandPortal(m) {
    if (!m || typeof m !== "object") return null;
    if (m.company && m.subprocessors) {
      return {
        presetId: String(m.presetId || "saas"),
        company: String(m.company || ""),
        domain: String(m.domain || ""),
        securityEmail: String(m.securityEmail || ""),
        tagline: String(m.tagline || ""),
        hostingRegion: String(m.hostingRegion || "AWS US-East (Multi-AZ)"),
        complianceFrame: String(m.complianceFrame || "SOC 2 Type II & GDPR"),
        logoData: String(m.logoData || ""),
        badges: Array.isArray(m.badges) ? m.badges.slice(0, 8) : [],
        pillarSummaries: m.pillarSummaries && typeof m.pillarSummaries === "object" ? m.pillarSummaries : {},
        subprocessors: Array.isArray(m.subprocessors) ? m.subprocessors.slice(0, 20) : [],
        whiteLabel: Boolean(m.whiteLabel),
        updatedAt: Number(m.updatedAt) || Date.now()
      };
    }

    if (!m.co && !m.pr) return null;

    return {
      presetId: String(m.pr || "saas"),
      company: String(m.co || "Acme Cloud"),
      domain: String(m.dm || "acmecloud.io"),
      securityEmail: String(m.se || "security@acmecloud.io"),
      tagline: String(m.tg || ""),
      hostingRegion: String(m.hr || "AWS US-East (Multi-AZ)"),
      complianceFrame: String(m.cf || "SOC 2 Type II & GDPR"),
      logoData: String(m.ld || ""),
      badges: Array.isArray(m.bg) ? m.bg.slice(0, 8).map((b) => String(b || "")) : [],
      pillarSummaries: m.ps && typeof m.ps === "object" ? m.ps : {},
      subprocessors: Array.isArray(m.sp)
        ? m.sp.slice(0, 20).map((s) => ({
            name: String(s.n || ""),
            purpose: String(s.p || ""),
            location: String(s.l || ""),
            dpaStatus: String(s.d || "DPA Executed")
          }))
        : [],
      whiteLabel: Boolean(m.wh),
      updatedAt: Number(m.ua) || Date.now()
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

  async function encodePortal(portalObj) {
    const minified = minifyPortal(portalObj);
    const jsonStr = JSON.stringify(minified);
    const utf8Bytes = new TextEncoder().encode(jsonStr);

    if (typeof CompressionStream === "function") {
      try {
        const compressed = await compressStream(utf8Bytes, "deflate-raw");
        return "z1_" + bytesToBase64Url(compressed);
      } catch (e) {
        // Fallback to plain base64url when CompressionStream is unavailable.
      }
    }
    return "b1_" + bytesToBase64Url(utf8Bytes);
  }

  async function decodePortal(encodedStr) {
    if (!encodedStr || typeof encodedStr !== "string") return null;
    if (encodedStr.length > MAX_ENCODED_CHARS) {
      console.warn("[TrustVaultCodec] Encoded portal payload exceeds safe limit.");
      return null;
    }
    try {
      const clean = encodedStr.trim();
      if (clean.startsWith("z1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const decompressed = await decompressStream(raw, "deflate-raw");
        if (decompressed.byteLength > 120000) return null;
        const jsonStr = new TextDecoder().decode(decompressed);
        return expandPortal(JSON.parse(jsonStr));
      }
      if (clean.startsWith("b1_")) {
        const raw = base64UrlToBytes(clean.slice(3));
        const jsonStr = new TextDecoder().decode(raw);
        return expandPortal(JSON.parse(jsonStr));
      }
      const raw = base64UrlToBytes(clean);
      const jsonStr = new TextDecoder().decode(raw);
      return expandPortal(JSON.parse(jsonStr));
    } catch (err) {
      console.warn("[TrustVaultCodec] Failed to decode trust portal link:", err);
      return null;
    }
  }

  /**
   * Downscale an uploaded logo image file to a lightweight raster Data URL (max 160px)
   * via canvas re-encoding, stripping active SVG markup and shrinking URL size.
   */
  function downscaleLogoFile(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type || !file.type.startsWith("image/")) {
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

  /**
   * Pure-JS SHA-256 fallback so attestation digests remain deterministic
   * even in non-HTTPS contexts where crypto.subtle is restricted.
   */
  function sha256HexSync(asciiStr) {
    const rightRotate = (val, amt) => (val >>> amt) | (val << (32 - amt));
    const maxWord = Math.pow(2, 32);
    const words = [];
    const utf8 = unescape(encodeURIComponent(asciiStr));
    const asciiBitLength = utf8.length * 8;

    const hash = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    const padded = utf8 + "\x80";
    for (let i = 0; i < padded.length; i++) {
      words[i >> 2] |= padded.charCodeAt(i) << ((3 - (i % 4)) * 8);
    }
    words[(((padded.length + 8) >> 6) + 1) * 16 - 1] = asciiBitLength;
    while (words.length % 16 !== 0) words.push(0);

    for (let j = 0; j < words.length; j += 16) {
      const w = words.slice(j, j + 16);
      for (let i = 16; i < 64; i++) {
        const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      let [a, b, c, d, e, f, g, h] = hash;
      for (let i = 0; i < 64; i++) {
        const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        const ch = (e & f) ^ (~e & g);
        const temp1 = (h + S1 + ch + k[i] + (w[i] | 0)) | 0;
        const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + temp1) | 0;
        d = c; c = b; b = a; a = (temp1 + temp2) | 0;
      }
      hash[0] = (hash[0] + a) | 0;
      hash[1] = (hash[1] + b) | 0;
      hash[2] = (hash[2] + c) | 0;
      hash[3] = (hash[3] + d) | 0;
      hash[4] = (hash[4] + e) | 0;
      hash[5] = (hash[5] + f) | 0;
      hash[6] = (hash[6] + g) | 0;
      hash[7] = (hash[7] + h) | 0;
    }

    return hash
      .map((val) => (((val < 0 ? val + maxWord : val) >>> 0).toString(16)).padStart(8, "0"))
      .join("");
  }

  /**
   * Computes a cryptographic SHA-256 Security Attestation Digest over a portal or questionnaire payload.
   */
  async function computeAttestationDigest(payloadObj) {
    const canonical = typeof payloadObj === "string" ? payloadObj : JSON.stringify(payloadObj || {});
    try {
      if (window.crypto && window.crypto.subtle && typeof TextEncoder === "function") {
        const bytes = new TextEncoder().encode(canonical);
        const digestBuf = await window.crypto.subtle.digest("SHA-256", bytes);
        const hashArr = Array.from(new Uint8Array(digestBuf));
        return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    } catch (e) {
      // Fallback to synchronous SHA-256 implementation below.
    }
    return sha256HexSync(canonical);
  }

  return {
    encodePortal,
    decodePortal,
    downscaleLogoFile,
    computeAttestationDigest,
    sha256HexSync
  };
})();
