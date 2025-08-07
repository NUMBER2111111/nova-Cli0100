// Nova Watchdog: gentle abuse/instability monitor
let modalCount = 0;
let lastModalTime = 0;

export function registerModalOpen() {
  const now = Date.now();
  if (now - lastModalTime < 4000) {
    modalCount++;
    if (modalCount >= 14) {
      alert("You’ve opened 14 modals in 4 seconds. Everything okay over there?");
      modalCount = 0;
    }
  } else {
    modalCount = 1;
  }
  lastModalTime = now;
}
