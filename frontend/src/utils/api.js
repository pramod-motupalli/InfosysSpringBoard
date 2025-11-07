import { getFastAPIUrl } from './env';

// normalize any base64 to a data URL
export function ensureDataUrl(v) {
  if (!v) return '';
  return v.startsWith('data:') ? v : `data:image/png;base64,${v}`;
}

// ---- Health ----
export async function checkBackendHealth() {
  const url = `${getFastAPIUrl()}/health`;
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) throw new Error(`Health check failed: ${res.status} ${res.statusText}`);
  // expected {status:"ok"} or {status:"error", message?}
  return res.json();
}

// ---- Vegetation (/predict/vegetation) ----
export async function segmentImage(file, confidence = 0.5, iou = 0.45) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('confidence', String(confidence));
  fd.append('iou', String(iou));

  const res = await fetch(`${getFastAPIUrl()}/predict/vegetation`, {
    method: 'POST',
    body: fd,
  });

  if (!res.ok) throw new Error(await safeText(res));

  const data = await res.json();

  // Flexible keys from your backend
  const img =
    data.segmentedImageUrl ||
    data.image_base64 ||
    data.mask_base64 ||
    data.result ||
    data.image ||
    '';

  return {
  segmentedImageUrl: ensureDataUrl(img),
  vegetationCoverage:
    data.vegetationCoverage ??
    data.coverage_pct ??        // 👈 added this key from backend
    data.coverage ??
    0,
  segmentsDetected:
    data.segmentsDetected ??
    data.segments ??
    0,
  processingTime:
    data.processingTime ??
    data.time ??
    0,
  raw: data,
};

}

// ---- Soil (/predict/soil) ----
export async function detectSoil(file, confidence = 0.5) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('confidence', String(confidence));

  const res = await fetch(`${getFastAPIUrl()}/predict/soil`, {
    method: 'POST',
    body: fd,
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) throw new Error(await safeText(res));

  const data = await res.json();

  // 👇 include annotated_png_b64 (your backend’s key)
  const img =
    data.annotated_png_b64 ||
    data.image_base64 ||
    data.result ||
    data.image ||
    data.annotated ||
    '';

  return {
    annotatedImageUrl: ensureDataUrl(img),
    counts: data.counts || null,
    legend: data.legend || null,
    raw: data,
  };
}


// ---- helpers ----
async function safeText(res) {
  try { return await res.text(); } catch { return `${res.status} ${res.statusText}`; }
}


// import { getFastAPIUrl } from './env';
// export const API_BASE = getFastAPIUrl();

// export function ensureDataUrl(v) {
//   if (!v) return '';
//   return v.startsWith('data:') ? v : `data:image/png;base64,${v}`;
// }

// async function safeText(res) {
//   try { return await res.text(); } catch { return `${res.status} ${res.statusText}`; }
// }

// export async function segmentImage(file, confidence = 0.5, iou = 0.45) {
//   const fd = new FormData();
//   fd.append('file', file);
//   fd.append('confidence', String(confidence));
//   fd.append('iou', String(iou));

//   const res = await fetch(`${API_BASE}/predict/vegetation`, {
//     method: 'POST',
//     body: fd,
//     headers: { Accept: 'application/json' },
//   });

//   if (!res.ok) throw new Error(await safeText(res));

//   const data = await res.json();

//   // now includes your backend keys:
//   // mask_png_b64 (preferred), plus other fallbacks for future-proofing
//   const img =
//     data.mask_png_b64 ||
//     data.segmentedImageUrl ||
//     data.image_base64 ||
//     data.mask_base64 ||
//     data.result ||
//     data.image ||
//     '';

//   if (!img) {
//     console.warn('Vegetation API JSON had no image field:', data);
//     throw new Error('Backend did not return a segmented image (mask_png_b64 missing).');
//   }

//   return {
//     segmentedImageUrl: ensureDataUrl(img),
//     vegetationCoverage:
//       data.coverage_pct ??
//       data.vegetationCoverage ??
//       data.coverage ??
//       0,
//     segmentsDetected: data.segmentsDetected ?? data.segments ?? 0,
//     processingTime: data.processingTime ?? data.time ?? 0,
//     width: data.width,
//     height: data.height,
//     raw: data,
//   };
// }
