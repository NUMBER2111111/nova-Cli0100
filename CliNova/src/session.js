// Session expiry/auto logout
const sessionTimeout = 30 * 60 * 1000; // 30 min
let lastActivity = Date.now();

document.addEventListener('mousemove', () => lastActivity = Date.now());
setInterval(() => {
  if (Date.now() - lastActivity > sessionTimeout) {
    alert('Session expired. Logging out...');
    // logout(); // your custom function
  }
}, 60000);
