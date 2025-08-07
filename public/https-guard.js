// Client-side runtime guard for HTTPS enforcement
if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'https:') {
  console.warn('⚠️ Not using HTTPS. Redirecting...');
  window.location.href = 'https://' + window.location.hostname + window.location.pathname;
}
