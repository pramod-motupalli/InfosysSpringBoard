export function getFastAPIUrl() {
  return import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';
}

export function isLocalMode() {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}
