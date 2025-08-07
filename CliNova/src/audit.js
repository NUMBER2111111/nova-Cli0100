// Nova audit trail (dev/admin only)
export function logUserAction(action) {
  if (import.meta.env.DEV) {
    console.log(`[Nova] User action: ${action}`);
  }
}
