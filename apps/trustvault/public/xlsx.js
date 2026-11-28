/**
 * TrustVault Zero-Dependency Native Excel (.XLSX) Reader & Writer
 * ---------------------------------------------------------------
 * Pure browser-local OOXML (.xlsx) ZIP archive parser & generator using native
 * DecompressionStream('deflate-raw') + DOMParser + CRC-32. Zero server uploads.
 */
window.TrustVaultXlsx = (function () {
  "use strict";

  const CRC_TABLE = (function () {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      t[i] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) {
      crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function u16LE(view, offset) {
    return view.getUint16(offset, true);
  }

  function u32LE(view, offset) {
    return view.getUint32(offset, true);
  }

  function writeU16(arr, val) {
    arr.push(val & 0xff, (val >>> 8) & 0xff);
  }

  function writeU32(arr, val) {
    arr.push(val & 0xff, (val >>> 8) & 0xff, (val >>> 16) & 0xff, (val >>> 24) & 0xff);
  }

  async function inflateRawBytes(bytes) {
    if (typeof DecompressionStream !== "function") {
      throw new Error("Modern browser DecompressionStream support is required for .xlsx compression.");
    }
    const ds = new DecompressionStream("deflate-raw");
    const writer = ds.writable.getWriter();
    writer.write(bytes);
    writer.close();
    const buf = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(buf);
  }

  async function readZipEntries(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const view = new DataView(arrayBuffer);
    let eocdOffset = -1;
    const minOff = Math.max(0, bytes.length - 65558);
    for (let i = bytes.length - 22; i >= minOff; i--) {
      if (u32LE(view, i) === 0x06054b50) {
        eocdOffset = i;
        break;
      }
    }
    if (eocdOffset === -1) {
      throw new Error("Invalid .xlsx file: ZIP directory header not found.");
    }

    const totalEntries = u16LE(view, eocdOffset + 10);
    const cdOffset = u32LE(view, eocdOffset + 16);
    const decoder = new TextDecoder("utf-8");
    const entries = {};
    let pos = cdOffset;

    for (let i = 0; i < totalEntries && pos + 46 <= bytes.length; i++) {
      if (u32LE(view, pos) !== 0x02014b50) break;
      const method = u16LE(view, pos + 10);
      const compSize = u32LE(view, pos + 20);
      const nameLen = u16LE(view, pos + 28);
      const extraLen = u16LE(view, pos + 30);
      const commentLen = u16LE(view, pos + 32);
      const localHeaderOff = u32LE(view, pos + 42);
      const name = decoder.decode(bytes.subarray(pos + 46, pos + 46 + nameLen));
      pos += 46 + nameLen + extraLen + commentLen;

      if (localHeaderOff + 30 > bytes.length || u32LE(view, localHeaderOff) !== 0x04034b50) continue;
      const lhNameLen = u16LE(view, localHeaderOff + 26);
      const lhExtraLen = u16LE(view, localHeaderOff + 28);
      const dataStart = localHeaderOff + 30 + lhNameLen + lhExtraLen;
      const slice = bytes.subarray(dataStart, dataStart + compSize);

      if (method === 0) {
        entries[name] = decoder.decode(slice);
      } else if (method === 8) {
        const inflated = await inflateRawBytes(slice);
        entries[name] = decoder.decode(inflated);
      }
    }
    return entries;
  }

  function colRefToIndex(ref) {
    const match = /^([A-Z]+)\d+$/i.exec(String(ref || "").trim());
    if (!match) return -1;
    const letters = match[1].toUpperCase();
    let idx = 0;
    for (let i = 0; i < letters.length; i++) {
      idx = idx * 26 + (letters.charCodeAt(i) - 64);
    }
    return idx - 1;
  }

  function parseSharedStrings(xmlText) {
    if (!xmlText) return [];
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    const siNodes = Array.from(doc.getElementsByTagName("si"));
    return siNodes.map((si) => {
      const tNodes = Array.from(si.getElementsByTagName("t"));
      return tNodes.map((t) => t.textContent || "").join("").trim();
    });
  }

  function parseSheetRows(xmlText, sharedStrings) {
    const doc = new DOMParser().parseFromString(xmlText, "application/xml");
    const rowNodes = Array.from(doc.getElementsByTagName("row"));
    const table = [];
    rowNodes.forEach((rowEl) => {
      const rowArr = [];
      const cells = Array.from(rowEl.getElementsByTagName("c"));
      cells.forEach((cEl) => {
        const ref = cEl.getAttribute("r") || "";
        let colIdx = colRefToIndex(ref);
        if (colIdx < 0) colIdx = rowArr.length;
        const type = cEl.getAttribute("t") || "";
        let val = "";
        if (type === "inlineStr") {
          const tNodes = Array.from(cEl.getElementsByTagName("t"));
          val = tNodes.map((t) => t.textContent || "").join("");
        } else {
          const vNode = cEl.getElementsByTagName("v")[0];
          const raw = vNode ? (vNode.textContent || "") : "";
          if (type === "s") {
            const sIdx = Number(raw);
            val = Number.isInteger(sIdx) && sharedStrings[sIdx] !== undefined ? sharedStrings[sIdx] : "";
          } else {
            val = raw;
          }
        }
        rowArr[colIdx] = String(val || "").replace(/\s+/g, " ").trim();
      });
      if (rowArr.some((x) => x && x.length > 0)) {
        table.push(rowArr);
      }
    });
    return table;
  }

  function extractQuestionsFromTable(rows) {
    if (!rows || rows.length === 0) return [];
    const firstRow = rows[0].map((c) => String(c || "").toLowerCase());
    let qCol = firstRow.findIndex((c) =>
      /question|requirement|control|inquiry|prompt|description/.test(c)
    );
    let startIdx = 0;

    if (qCol !== -1) {
      startIdx = 1;
    } else {
      if (firstRow.some((c) => /^(id|#|no|number|category|pillar)$/i.test(c))) {
        startIdx = 1;
      }
      const colScores = [];
      const sampleEnd = Math.min(rows.length, 20);
      for (let r = startIdx; r < sampleEnd; r++) {
        for (let c = 0; c < rows[r].length; c++) {
          const cell = String(rows[r][c] || "");
          if (/^(high|medium|low|yes|no|n\/a|pass|fail)$/i.test(cell)) continue;
          colScores[c] = (colScores[c] || 0) + cell.length;
        }
      }
      let bestLen = -1;
      for (let c = 0; c < colScores.length; c++) {
        if ((colScores[c] || 0) > bestLen) {
          bestLen = colScores[c];
          qCol = c;
        }
      }
    }

    if (qCol < 0) qCol = 0;
    const out = [];
    for (let r = startIdx; r < rows.length; r++) {
      const txt = String(rows[r][qCol] || "").trim();
      if (txt.length >= 6 && !/^(#|\d+|question|buyer question|requirement|security question)$/i.test(txt)) {
        out.push(txt);
      }
    }
    return out;
  }

  async function parseXlsxQuestions(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const sharedStrings = parseSharedStrings(entries["xl/sharedStrings.xml"] || "");
    const sheetNames = Object.keys(entries)
      .filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(k))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    if (sheetNames.length === 0) {
      throw new Error("No worksheet tabs found inside .xlsx archive.");
    }

    const questions = [];
    const seen = new Set();
    let totalRows = 0;

    sheetNames.forEach((sName) => {
      const table = parseSheetRows(entries[sName], sharedStrings);
      totalRows += table.length;
      const qs = extractQuestionsFromTable(table);
      qs.forEach((q) => {
        const key = q.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          questions.push(q);
        }
      });
    });

    return {
      questions: questions.slice(0, 250),
      sheetCount: sheetNames.length,
      fileRowCount: totalRows
    };
  }

  function cleanXmlText(val) {
    return String(val == null ? "" : val)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, " ")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function indexToColLetter(colIdx) {
    let n = colIdx + 1;
    let s = "";
    while (n > 0) {
      const rem = (n - 1) % 26;
      s = String.fromCharCode(65 + rem) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  function buildWorksheetXml(tableRows, colWidths, headerStyleIdx) {
    const colsXml = (colWidths || [])
      .map((w, idx) => `<col min="${idx + 1}" max="${idx + 1}" width="${w}" customWidth="1"/>`)
      .join("");

    const rowsXml = tableRows
      .map((row, rIdx) => {
        const rowNum = rIdx + 1;
        const cellsXml = row
          .map((val, cIdx) => {
            const ref = `${indexToColLetter(cIdx)}${rowNum}`;
            const style = rIdx === 0 ? ` s="${headerStyleIdx || 1}"` : ` s="2"`;
            if (typeof val === "number" && Number.isFinite(val)) {
              return `<c r="${ref}"${style}><v>${val}</v></c>`;
            }
            return `<c r="${ref}" t="inlineStr"${style}><is><t xml:space="preserve">${cleanXmlText(val)}</t></is></c>`;
          })
          .join("");
        return `<row r="${rowNum}">${cellsXml}</row>`;
      })
      .join("");

    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      (colsXml ? `<cols>${colsXml}</cols>` : "") +
      `<sheetData>${rowsXml}</sheetData>` +
      "</worksheet>"
    );
  }

  function buildZipBlob(fileMap, mimeType) {
    const encoder = new TextEncoder();
    const parts = [];
    const centralDir = [];
    let offset = 0;

    const now = new Date();
    const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xffff;
    const dosDate =
      ((((Math.max(1980, now.getFullYear()) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate())) & 0xffff;

    Object.keys(fileMap).forEach((name) => {
      const nameBytes = encoder.encode(name);
      const dataBytes = encoder.encode(fileMap[name]);
      const crc = crc32(dataBytes);
      const lh = [];
      writeU32(lh, 0x04034b50);
      writeU16(lh, 20);
      writeU16(lh, 0x0800); // UTF-8 filename flag
      writeU16(lh, 0); // Stored (method 0) for universal Excel/Sheets/Numbers compatibility
      writeU16(lh, dosTime);
      writeU16(lh, dosDate);
      writeU32(lh, crc);
      writeU32(lh, dataBytes.length);
      writeU32(lh, dataBytes.length);
      writeU16(lh, nameBytes.length);
      writeU16(lh, 0);
      const lhBytes = new Uint8Array(lh);

      parts.push(lhBytes, nameBytes, dataBytes);

      const cd = [];
      writeU32(cd, 0x02014b50);
      writeU16(cd, 20);
      writeU16(cd, 20);
      writeU16(cd, 0x0800);
      writeU16(cd, 0);
      writeU16(cd, dosTime);
      writeU16(cd, dosDate);
      writeU32(cd, crc);
      writeU32(cd, dataBytes.length);
      writeU32(cd, dataBytes.length);
      writeU16(cd, nameBytes.length);
      writeU16(cd, 0);
      writeU16(cd, 0);
      writeU16(cd, 0);
      writeU16(cd, 0);
      writeU32(cd, 0);
      writeU32(cd, offset);
      centralDir.push(new Uint8Array(cd), nameBytes);

      offset += lhBytes.length + nameBytes.length + dataBytes.length;
    });

    const cdSize = centralDir.reduce((acc, u) => acc + u.length, 0);
    const entryCount = Object.keys(fileMap).length;
    const eocd = [];
    writeU32(eocd, 0x06054b50);
    writeU16(eocd, 0);
    writeU16(eocd, 0);
    writeU16(eocd, entryCount);
    writeU16(eocd, entryCount);
    writeU32(eocd, cdSize);
    writeU32(eocd, offset);
    writeU16(eocd, 0);

    return new Blob(parts.concat(centralDir, [new Uint8Array(eocd)]), {
      type: mimeType || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });
  }

  function buildXlsxBlob(opts) {
    const o = opts || {};
    const rows = Array.isArray(o.rows) ? o.rows : [];
    const qaTable = [
      ["#", "Buyer Question", "Confidence", "Security Pillar", "Evidence Reference", "Approved Response"]
    ];
    rows.forEach((r) => {
      qaTable.push([
        Number(r.index) || 0,
        String(r.originalQuestion || ""),
        String(r.confidence || ""),
        String(r.pillar || ""),
        String(r.evidenceTag || ""),
        String(r.suggestedAnswer || "")
      ]);
    });

    const attTable = [
      ["TrustVault Verification Field", "Attested Value"],
      ["Company", String(o.company || "Enterprise Vendor")],
      ["Primary Domain", String(o.domain || "yourdomain.com")],
      ["Generated Timestamp (UTC)", new Date().toISOString()],
      ["SHA-256 Attestation Digest", String(o.digest || "pending")],
      ["Questions Exported", rows.length]
    ];

    const dns = o.dnsAudit;
    if (dns && dns.grade) {
      attTable.push(["Live DNS Security Grade", `${dns.grade} (${dns.score}/100)`]);
      attTable.push(["DMARC Anti-Spoofing", (dns.checks && dns.checks.dmarc && dns.checks.dmarc.status) || "Checked"]);
      attTable.push(["SPF Sender Policy", (dns.checks && dns.checks.spf && dns.checks.spf.status) || "Checked"]);
      attTable.push(["CAA SSL Lock", (dns.checks && dns.checks.caa && dns.checks.caa.status) || "Checked"]);
      attTable.push(["DNSSEC Integrity", (dns.checks && dns.checks.dnssec && dns.checks.dnssec.status) || "Checked"]);
      attTable.push(["DNS Verified At (UTC)", String(dns.checkedAt || "")]);
    } else {
      attTable.push(["Live DNS Security Scan", "Not run in session (Click Live Verify Domain DNS before export)"]);
    }

    const stylesXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="2">' +
      '<font><sz val="11"/><name val="Calibri"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>' +
      "</fonts>" +
      '<fills count="3">' +
      '<fill><patternFill patternType="none"/></fill>' +
      '<fill><patternFill patternType="gray125"/></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FF071224"/></patternFill></fill>' +
      "</fills>" +
      '<borders count="2">' +
      '<border><left/><right/><top/><bottom/><diagonal/></border>' +
      '<border><left style="thin"><color rgb="FFE2E8F0"/></left><right style="thin"><color rgb="FFE2E8F0"/></right><top style="thin"><color rgb="FFE2E8F0"/></top><bottom style="thin"><color rgb="FFE2E8F0"/></bottom></border>' +
      "</borders>" +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="3">' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>' +
      "</cellXfs>" +
      "</styleSheet>";

    const contentTypesXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      "</Types>";

    const relsXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
      "</Relationships>";

    const workbookXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      "<sheets>" +
      '<sheet name="Security_Questionnaire" sheetId="1" r:id="rId1"/>' +
      '<sheet name="Live_Attestation" sheetId="2" r:id="rId2"/>' +
      "</sheets>" +
      "</workbook>";

    const workbookRelsXml =
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>' +
      '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      "</Relationships>";

    const sheet1Xml = buildWorksheetXml(qaTable, [7, 46, 16, 26, 28, 68], 1);
    const sheet2Xml = buildWorksheetXml(attTable, [32, 68], 1);

    return buildZipBlob({
      "[Content_Types].xml": contentTypesXml,
      "_rels/.rels": relsXml,
      "xl/workbook.xml": workbookXml,
      "xl/_rels/workbook.xml.rels": workbookRelsXml,
      "xl/styles.xml": stylesXml,
      "xl/worksheets/sheet1.xml": sheet1Xml,
      "xl/worksheets/sheet2.xml": sheet2Xml
    });
  }

  return {
    parseXlsxQuestions,
    buildXlsxBlob
  };
})();
