"use client";
import React, { useState, useEffect } from "react";
import { getAllReports, markReportReviewed, deleteReport as deleteReportApi } from "../lib/api";

const sidebarItems = [
  { icon: "grid", label: "Dashboard", href: "/dashboard" },
  { icon: "flag", label: "Report Threat", href: "/report-threat" },
  { icon: "bulb", label: "Security Tips", href: "/tips" },
  { icon: "user", label: "My Profile", href: "/profile" },
  { icon: "shield", label: "Admin Panel", href: "/admin", active: true, admin: true },
];

const initialReports = [
  { id: 1, user: "Ali Hassan", email: "ali@email.com", type: "Phishing", url: "http://fake-paypal.com/login", desc: "Fake PayPal login page stealing credentials", status: "pending", date: "2025-01-20" },
  { id: 2, user: "Sara Ahmed", email: "sara@email.com", type: "Malware", url: "http://free-movies.xyz/download", desc: "Malicious file download disguised as movie", status: "reviewed", date: "2025-01-19" },
  { id: 3, user: "Ahmed Khan", email: "ahmed@email.com", type: "Fake Site", url: "http://amazon-deals-pk.com", desc: "Fake Amazon website collecting payment info", status: "pending", date: "2025-01-18" },
  { id: 4, user: "Fatima Malik", email: "fatima@email.com", type: "Bad Link", url: "http://bit.ly/win-prize-now", desc: "Suspicious shortened link from WhatsApp group", status: "pending", date: "2025-01-18" },
  { id: 5, user: "Usman Raza", email: "usman@email.com", type: "Scam", url: "http://jobs-pk-apply.com", desc: "Fake job website asking for advance payment", status: "reviewed", date: "2025-01-17" },
  { id: 6, user: "Zara Siddiqui", email: "zara@email.com", type: "Phishing", url: "http://hbl-secure-verify.com", desc: "Fake HBL bank verification page", status: "pending", date: "2025-01-16" },
];

const initialUsers = [
  { id: 1, name: "Ali Hassan", email: "ali@email.com", reports: 4, joined: "2025-01-10", status: "active" },
  { id: 2, name: "Sara Ahmed", email: "sara@email.com", reports: 2, joined: "2025-01-12", status: "active" },
  { id: 3, name: "Ahmed Khan", email: "ahmed@email.com", reports: 3, joined: "2025-01-08", status: "blocked" },
  { id: 4, name: "Fatima Malik", email: "fatima@email.com", reports: 1, joined: "2025-01-15", status: "active" },
  { id: 5, name: "Usman Raza", email: "usman@email.com", reports: 5, joined: "2025-01-05", status: "active" },
  { id: 6, name: "Zara Siddiqui", email: "zara@email.com", reports: 2, joined: "2025-01-18", status: "active" },
];

const typeColor: Record<string, { color: string; bg: string }> = {
  Phishing: { color: "#f87171", bg: "rgba(239,68,68,0.1)" },
  Malware: { color: "#fb923c", bg: "rgba(249,115,22,0.1)" },
  "Fake Site": { color: "#fbbf24", bg: "rgba(234,179,8,0.1)" },
  "Bad Link": { color: "#00e5ff", bg: "rgba(0,229,255,0.1)" },
  Scam: { color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"reports" | "users">("reports");
  const [reports, setReports] = useState(initialReports);
  const [users, setUsers] = useState(initialUsers);
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedReport, setSelectedReport] = useState<typeof initialReports[0] | null>(null);

  useEffect(() => {
    getAllReports().then((data) => {
      if (Array.isArray(data)) {
        const mapped = data.map((r: any) => ({
          id: r.id,
          user: r.user?.name || "Unknown",
          email: r.user?.email || "",
          type: r.threatType,
          url: r.url,
          desc: r.description,
          status: r.status === "REVIEWED" ? "reviewed" : "pending",
          date: r.createdAt?.split("T")[0] || "",
        }));
        setReports(mapped);
      }
    }).catch(() => { });
  }, []);

  const markReviewed = (id: number) => {
    markReportReviewed(id).then(() => {
      setReports(reports.map(r =>
        r.id === id ? { ...r, status: "reviewed" } : r
      ));
      if (selectedReport?.id === id) setSelectedReport(null);
    });
  };

  const deleteReport = (id: number) => {
    deleteReportApi(id).then(() => {
      setReports(reports.filter(r => r.id !== id));
      if (selectedReport?.id === id) setSelectedReport(null);
    });
  };

  const toggleUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
  };

  const filteredReports = reports.filter(r =>
    filterStatus === "all" ? true : r.status === filterStatus
  );

  const stats = {
    totalUsers: users.length,
    totalReports: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    reviewed: reports.filter(r => r.status === "reviewed").length,
    blocked: users.filter(u => u.status === "blocked").length,

  };



  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", display: "flex", fontFamily: "sans-serif", color: "#fff" }}>

      {/* BG GRID */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        backgroundColor: "#050505", borderRight: "1px solid #0f172a",
        display: "flex", flexDirection: "column", zIndex: 40,
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #0f172a", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: 18 }}>Cyber<span style={{ color: "#00e5ff" }}>Shield</span></span>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {sidebarItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 10, marginBottom: 4,
              textDecoration: "none",
              backgroundColor: item.active ? "rgba(167,139,250,0.08)" : "transparent",
              border: item.active ? "1px solid rgba(167,139,250,0.2)" : "1px solid transparent",
              color: item.active ? "#a78bfa" : item.admin ? "#a78bfa" : "#64748b",
              fontSize: 14, fontWeight: item.active ? 600 : 400, transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (!item.active) { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#fff"; } }}
              onMouseLeave={(e) => { if (!item.active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = item.admin ? "#a78bfa" : "#64748b"; } }}
            >
              <SidebarIcon name={item.icon} />
              {item.label}
              {item.admin && <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, backgroundColor: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>ADMIN</span>}
            </a>
          ))}
        </nav>

        <div style={{ margin: "0 12px 16px", padding: 14, borderRadius: 12, backgroundColor: "#0a0a0a", border: "1px solid #0f172a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff" }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>Admin</div>
              <div style={{ fontSize: 11, color: "#a78bfa" }}>Administrator</div>
            </div>
            <a href="/login" style={{ marginLeft: "auto", color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* ══════════ MAIN ══════════ */}
      <div style={{ flex: 1, marginLeft: 240, position: "relative", zIndex: 10 }}>

        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30, padding: "16px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #0f172a",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Admin Panel</h1>
              <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Manage reports & users 👑</p>
            </div>
          </div>
          <span style={{ padding: "6px 16px", borderRadius: 99, backgroundColor: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa", fontSize: 12, fontWeight: 700 }}>ADMIN ACCESS</span>
        </header>

        <div style={{ padding: 32 }}>

          {/* ── STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 28 }}>
            {[
              { label: "Total Users", value: stats.totalUsers, color: "#00e5ff", bg: "rgba(0,229,255,0.07)", border: "rgba(0,229,255,0.15)" },
              { label: "Total Reports", value: stats.totalReports, color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.15)" },
              { label: "Pending", value: stats.pending, color: "#f97316", bg: "rgba(249,115,22,0.07)", border: "rgba(249,115,22,0.15)" },
              { label: "Reviewed", value: stats.reviewed, color: "#22c55e", bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.15)" },
              { label: "Blocked Users", value: stats.blocked, color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.15)" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "18px 16px", borderRadius: 14, backgroundColor: s.bg, border: `1px solid ${s.border}`, transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── TABS ── */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, backgroundColor: "#050505", padding: 4, borderRadius: 12, border: "1px solid #0f172a", width: "fit-content" }}>
            {(["reports", "users"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: "9px 24px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontSize: 14, fontWeight: 600, transition: "all 0.2s",
                  backgroundColor: activeTab === tab ? "#a78bfa" : "transparent",
                  color: activeTab === tab ? "#000" : "#64748b",
                  boxShadow: activeTab === tab ? "0 0 15px rgba(167,139,250,0.3)" : "none",
                }}>
                {tab === "reports" ? `📋 Reports (${reports.length})` : `👥 Users (${users.length})`}
              </button>
            ))}
          </div>

          {/* ══════════ REPORTS TAB ══════════ */}
          {activeTab === "reports" && (
            <div style={{ display: "grid", gridTemplateColumns: selectedReport ? "1fr 380px" : "1fr", gap: 20 }}>

              {/* Reports Table */}
              <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", overflow: "hidden" }}>
                {/* Filter Bar */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #0f172a", display: "flex", gap: 8 }}>
                  {["all", "pending", "reviewed"].map((f) => (
                    <button key={f} onClick={() => setFilterStatus(f)}
                      style={{
                        padding: "6px 16px", borderRadius: 99, border: "none", cursor: "pointer",
                        fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                        backgroundColor: filterStatus === f
                          ? f === "pending" ? "#f97316" : f === "reviewed" ? "#22c55e" : "#a78bfa"
                          : "#0a0a0a",
                        color: filterStatus === f ? "#000" : "#64748b",
                        outline: filterStatus !== f ? "1px solid #1e293b" : "none",
                      }}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                      {f !== "all" && ` (${reports.filter(r => r.status === f).length})`}
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#0a0a0a" }}>
                        {["#", "User", "Type", "URL", "Status", "Date", "Actions"].map((h) => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((r) => {
                        const tc = typeColor[r.type] || { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" };
                        return (
                          <tr key={r.id}
                            style={{
                              borderTop: "1px solid #0f172a", transition: "background 0.15s",
                              backgroundColor: selectedReport?.id === r.id ? "rgba(167,139,250,0.05)" : "transparent",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => { if (selectedReport?.id !== r.id) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"; }}
                            onMouseLeave={(e) => { if (selectedReport?.id !== r.id) e.currentTarget.style.backgroundColor = "transparent"; }}
                            onClick={() => setSelectedReport(selectedReport?.id === r.id ? null : r)}
                          >
                            <td style={{ padding: "14px 16px", fontSize: 13, color: "#475569" }}>#{r.id}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{r.user}</div>
                              <div style={{ fontSize: 11, color: "#475569" }}>{r.email}</div>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{ padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, backgroundColor: tc.bg, color: tc.color }}>{r.type}</span>
                            </td>
                            <td style={{ padding: "14px 16px", maxWidth: 160 }}>
                              <div style={{ fontSize: 12, color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.url}</div>
                            </td>
                            <td style={{ padding: "14px 16px" }}>
                              <span style={{
                                padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                                backgroundColor: r.status === "pending" ? "rgba(249,115,22,0.1)" : "rgba(34,197,94,0.1)",
                                color: r.status === "pending" ? "#fb923c" : "#4ade80",
                              }}>
                                {r.status === "pending" ? "⏳ Pending" : "✅ Reviewed"}
                              </span>
                            </td>
                            <td style={{ padding: "14px 16px", fontSize: 12, color: "#475569", whiteSpace: "nowrap" }}>{r.date}</td>
                            <td style={{ padding: "14px 16px" }}>
                              <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                                {r.status === "pending" && (
                                  <button onClick={() => markReviewed(r.id)}
                                    style={{ padding: "5px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, backgroundColor: "rgba(34,197,94,0.1)", color: "#4ade80", transition: "all 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(34,197,94,0.2)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(34,197,94,0.1)")}
                                    title="Mark as Reviewed">✓</button>
                                )}
                                <button onClick={() => deleteReport(r.id)}
                                  style={{ padding: "5px 10px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", transition: "all 0.2s" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.2)")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)")}
                                  title="Delete">✕</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filteredReports.length === 0 && (
                    <div style={{ padding: "40px", textAlign: "center", color: "#334155", fontSize: 14 }}>No reports found</div>
                  )}
                </div>
              </div>

              {/* Report Detail Panel */}
              {selectedReport && (
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid rgba(167,139,250,0.2)", padding: 24, height: "fit-content" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: "#a78bfa" }}>Report #{selectedReport.id}</h3>
                    <button onClick={() => setSelectedReport(null)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontSize: 18, padding: 0 }}>×</button>
                  </div>
                  {[
                    { label: "Reported By", value: selectedReport.user },
                    { label: "Email", value: selectedReport.email },
                    { label: "Threat Type", value: selectedReport.type },
                    { label: "Date", value: selectedReport.date },
                    { label: "Status", value: selectedReport.status === "pending" ? "⏳ Pending" : "✅ Reviewed" },
                    { label: "Suspicious URL", value: selectedReport.url },
                    { label: "Description", value: selectedReport.desc },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, color: "#e2e8f0", lineHeight: 1.6, wordBreak: "break-all" }}>{item.value}</div>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                    {selectedReport.status === "pending" && (
                      <button onClick={() => markReviewed(selectedReport.id)}
                        style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, backgroundColor: "rgba(34,197,94,0.1)", color: "#4ade80" }}>
                        ✓ Mark Reviewed
                      </button>
                    )}
                    <button onClick={() => deleteReport(selectedReport.id)}
                      style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══════════ USERS TAB ══════════ */}
          {activeTab === "users" && (
            <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0a0a0a" }}>
                    {["#", "Name", "Email", "Reports", "Joined", "Status", "Action"].map((h) => (
                      <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}
                      style={{ borderTop: "1px solid #0f172a", transition: "background 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={{ padding: "14px 18px", fontSize: 13, color: "#475569" }}>#{u.id}</td>
                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#000", flexShrink: 0 }}>
                            {u.name.charAt(0)}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 18px", fontSize: 13, color: "#64748b" }}>{u.email}</td>
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#00e5ff" }}>{u.reports}</span>
                      </td>
                      <td style={{ padding: "14px 18px", fontSize: 12, color: "#475569" }}>{u.joined}</td>
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{
                          padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                          backgroundColor: u.status === "active" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                          color: u.status === "active" ? "#4ade80" : "#f87171",
                        }}>
                          {u.status === "active" ? "● Active" : "● Blocked"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <button onClick={() => toggleUser(u.id)}
                          style={{
                            padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                            fontSize: 12, fontWeight: 700, transition: "all 0.2s",
                            backgroundColor: u.status === "active" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)",
                            color: u.status === "active" ? "#f87171" : "#4ade80",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                          {u.status === "active" ? "Block User" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </div>
  );
}

function SidebarIcon({ name }: { name: string }): React.ReactNode {
  const icons: Record<string, React.ReactNode> = {
    grid: <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
    flag: <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>,
    bulb: <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
    user: <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
    shield: <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  };
  return icons[name] || null;
}
