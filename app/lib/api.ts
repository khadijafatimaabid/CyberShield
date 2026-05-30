const BASE_URL = "http://localhost:8080/api";

// ── AUTH ──
export async function registerUser(data: {
  name: string; email: string; password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: {
  email: string; password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ── TIPS ──
export async function getAllTips() {
  const res = await fetch(`${BASE_URL}/tips/all`);
  return res.json();
}

// ── REPORTS ──
export async function submitReport(data: {
  userId: string; threatType: string;
  url: string; description: string;
}) {
  const res = await fetch(`${BASE_URL}/reports/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllReports() {
  const res = await fetch(`${BASE_URL}/reports/all`);
  return res.json();
}

export async function getReportStats() {
  const res = await fetch(`${BASE_URL}/reports/stats`);
  return res.json();
}

export async function markReportReviewed(id: number) {
  const res = await fetch(`${BASE_URL}/reports/review/${id}`, {
    method: "PUT",
  });
  return res.json();
}

export async function deleteReport(id: number) {
  const res = await fetch(`${BASE_URL}/reports/delete/${id}`, {
    method: "DELETE",
  });
  return res.json();
}