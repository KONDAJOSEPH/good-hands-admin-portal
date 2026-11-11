import { P } from "./sample";

// Set NEXT_PUBLIC_API_URL (for example http://localhost:8000/api) to read from the Django REST API.
// Confirm endpoint names and response shapes against the backend before integration.
export async function fetchRows(id) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (base) {
    const res = await fetch(`${base}/${id}/`, { credentials: "include" });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.results;
  }
  return new Promise((resolve) => setTimeout(() => resolve(P[id].rows.map((r) => ({ ...r }))), 350));
}
