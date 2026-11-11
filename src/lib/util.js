export const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-UG") : n);

export const bc = (v) =>
  /^(Active|Paid|Completed|Verified)$/.test(v) ? "g"
  : /^(Pending|Partial|Summary only)$/.test(v) ? "w"
  : v === "Scheduled" ? "i"
  : /^(Inactive|Conflict|Cancelled)$/.test(v) ? "r" : "";

export function toast(message) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = message;
  t.classList.add("on");
  clearTimeout(toast.h);
  toast.h = setTimeout(() => t.classList.remove("on"), 2400);
}
