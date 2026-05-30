"use client";
import React, { useState, useEffect } from "react";
import { getReportStats, getAllReports } from "../lib/api";

const menuItems = [
  { icon: "grid", label: "Dashboard", href: "/dashboard", active: true },
  { icon: "flag", label: "Report Threat", href: "/report-threat", active: false },
  { icon: "bulb", label: "Security Tips", href: "/tips", active: false },
  { icon: "user", label: "My Profile", href: "/profile", active: false },
  { icon: "shield", label: "Admin Panel", href: "/admin", active: false, admin: true },
];

const threatColors: Record<string, { color: string; pct: number }> = {
  "phishing":        { color: "#ef4444", pct: 75 },
  "malware":         { color: "#f97316", pct: 45 },
  "fake-site":       { color: "#eab308", pct: 30 },
  "suspicious-link": { color: "#00e5ff", pct: 15 },
  "scam":            { color: "#a78bfa", pct: 20 },
  "other":           { color: "#64748b", pct: 10 },
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Khadija");
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0 });
  const [threatBreakdown, setThreatBreakdown] = useState<{ label: string; count: number; color: string; pct: number }[]>([]);
  const securityScore = 78;

  useEffect(() => {
    // LocalStorage se user name lo
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    // Stats API se lo
    getReportStats().then((data) => {
      if (data.total !== undefined) {
        setStats({ total: data.total, pending: data.pending, reviewed: data.reviewed });
      }
    }).catch(() => {});

    // Reports API se threat breakdown banao
    const userId = localStorage.getItem("userId");
    if (userId) {
      getAllReports().then((reports: any[]) => {
        if (!Array.isArray(reports)) return;
        // Sirf is user ke reports
        const myReports = reports.filter((r: any) => String(r.user?.id) === userId);
        const countMap: Record<string, number> = {};
        myReports.forEach((r: any) => {
          const t = (r.threatType || "other").toLowerCase();
          countMap[t] = (countMap[t] || 0) + 1;
        });
        const breakdown = Object.entries(countMap).map(([label, count]) => ({
          label: label.charAt(0).toUpperCase() + label.slice(1).replace("-", " "),
          count,
          color: threatColors[label]?.color || "#64748b",
          pct: threatColors[label]?.pct || 20,
        }));
        if (breakdown.length > 0) setThreatBreakdown(breakdown);
      }).catch(() => {});
    }
  }, []);

  const recentActivity = [
    { icon: "flag", color: "#ef4444", bg: "rgba(239,68,68,0.1)", text: "Reported phishing link", time: "2 mins ago" },
    { icon: "bulb", color: "#00e5ff", bg: "rgba(0,229,255,0.1)", text: "Read tip: Strong Passwords", time: "1 hour ago" },
    { icon: "check", color: "#22c55e", bg: "rgba(34,197,94,0.1)", text: "Account password updated", time: "Yesterday" },
    { icon: "flag", color: "#ef4444", bg: "rgba(239,68,68,0.1)", text: "Reported fake website", time: "2 days ago" },
    { icon: "user", color: "#a78bfa", bg: "rgba(167,139,250,0.1)", text: "Profile setup completed", time: "3 days ago" },
  ];

  const displayThreat = threatBreakdown.length > 0 ? threatBreakdown : [
    { label: "Phishing", count: 0, color: "#ef4444", pct: 0 },
    { label: "Malware", count: 0, color: "#f97316", pct: 0 },
  ];

  return (
    <div style={{ backgroundColor: "#000000", minHeight: "100vh", display: "flex", fontFamily: "sans-serif", color: "#fff", position: "relative" }}>

      {/* BG GRID */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      {/* SIDEBAR */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        backgroundColor: "#050505", borderRight: "1px solid #0f172a",
        display: "flex", flexDirection: "column", zIndex: 40,
        transition: "transform 0.3s",
        transform: sidebarOpen ? "translateX(0)" : "translateX(0)",
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
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 10, marginBottom: 4, textDecoration: "none",
              backgroundColor: item.active ? "rgba(0,229,255,0.08)" : "transparent",
              border: item.active ? "1px solid rgba(0,229,255,0.15)" : "1px solid transparent",
              color: item.active ? "#00e5ff" : item.admin ? "#a78bfa" : "#64748b",
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
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000" }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>{userName}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>User Account</div>
            </div>
            <a href="/login" style={{ marginLeft: "auto", color: "#475569" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              title="Logout"
              onClick={() => { localStorage.clear(); }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, marginLeft: 240, display: "flex", flexDirection: "column", position: "relative", zIndex: 10, minHeight: "100vh" }}>

        {/* HEADER */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30, padding: "16px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #0f172a",
        }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Dashboard</h1>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Welcome back, {userName} 👋</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{ position: "relative", background: "none", border: "1px solid #1e293b", borderRadius: 10, padding: "9px 10px", cursor: "pointer", color: "#64748b", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}>
              <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span style={{ position: "absolute", top: 6, right: 7, width: 7, height: 7, borderRadius: "50%", backgroundColor: "#ef4444", border: "1.5px solid #000" }} />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000", cursor: "pointer" }}>
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div style={{ padding: "32px", flex: 1 }}>

          {/* STATS CARDS — Real Data */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Total Reports", value: stats.total, icon: "📋", color: "#00e5ff", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.15)" },
              { label: "Pending Review", value: stats.pending, icon: "⏳", color: "#f97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)" },
              { label: "Reviewed", value: stats.reviewed, icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
              { label: "Security Score", value: `${securityScore}%`, icon: "🔒", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "22px 20px", borderRadius: 16, backgroundColor: s.bg, border: `1px solid ${s.border}`, transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 30, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* SECURITY SCORE + ACTIVITY */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, marginBottom: 28 }}>

            {/* Security Score */}
            <div style={{ padding: 28, borderRadius: 20, backgroundColor: "#050505", border: "1px solid #0f172a" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>Security Score</div>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ position: "relative", width: 140, height: 140 }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="58" fill="none" stroke="#0f172a" strokeWidth="12" />
                    <circle cx="70" cy="70" r="58" fill="none"
                      stroke={securityScore >= 80 ? "#22c55e" : securityScore >= 60 ? "#eab308" : "#ef4444"}
                      strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 58}`}
                      strokeDashoffset={`${2 * Math.PI * 58 * (1 - securityScore / 100)}`}
                      transform="rotate(-90 70 70)"
                      style={{ transition: "stroke-dashoffset 1s ease" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 32, fontWeight: 900, color: "#f1f5f9" }}>{securityScore}%</span>
                    <span style={{ fontSize: 11, color: "#475569" }}>Score</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "2FA Enabled", done: false },
                  { label: "Strong Password", done: true },
                  { label: "Email Verified", done: true },
                  { label: "Recent Threats Checked", done: false },
                ].map((tip) => (
                  <div key={tip.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: tip.done ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.1)", border: `1px solid ${tip.done ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {tip.done
                        ? <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                        : <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                    </div>
                    <span style={{ fontSize: 13, color: tip.done ? "#94a3b8" : "#64748b" }}>{tip.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ padding: 28, borderRadius: 20, backgroundColor: "#050505", border: "1px solid #0f172a" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase" }}>Recent Activity</div>
                <a href="#" style={{ fontSize: 12, color: "#00e5ff", textDecoration: "none" }}>View All</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {recentActivity.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid #0f172a" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ActivityIcon name={item.icon} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 500 }}>{item.text}</div>
                      <div style={{ fontSize: 11, color: "#334155", marginTop: 2 }}>{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THREAT BREAKDOWN + QUICK ACTIONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>

            {/* Threat Breakdown */}
            <div style={{ padding: 28, borderRadius: 20, backgroundColor: "#050505", border: "1px solid #0f172a" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 24 }}>My Threat Reports</div>
              {displayThreat.length === 0 ? (
                <div style={{ textAlign: "center", color: "#334155", padding: "20px 0" }}>No reports yet</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {displayThreat.map((t) => (
                    <div key={t.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                        <span style={{ fontSize: 13, color: "#94a3b8" }}>{t.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.count} reports</span>
                      </div>
                      <div style={{ height: 6, backgroundColor: "#0f172a", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 99, backgroundColor: t.color, width: `${t.pct}%`, transition: "width 1s ease", boxShadow: `0 0 8px ${t.color}60` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ padding: 28, borderRadius: 20, backgroundColor: "#050505", border: "1px solid #0f172a" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>Quick Actions</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Report a Threat", href: "/report-threat", color: "#ef4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", icon: "🚨" },
                  { label: "Read Security Tips", href: "/tips", color: "#00e5ff", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.2)", icon: "💡" },
                  { label: "Update Profile", href: "/profile", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", icon: "👤" },
                  { label: "View Admin Panel", href: "/admin", color: "#a78bfa", bg: "rgba(167,139,250,0.05)", border: "rgba(167,139,250,0.15)", icon: "🛡️" },
                ].map((action) => (
                  <a key={action.label} href={action.href} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: 12, textDecoration: "none", backgroundColor: action.bg, border: `1px solid ${action.border}`, color: action.color, fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}>
                    <span style={{ fontSize: 18 }}>{action.icon}</span>
                    {action.label}
                    <svg style={{ marginLeft: "auto" }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
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

function ActivityIcon({ name, color }: { name: string; color: string }) {
  const s = { width: 16, height: 16 };
  if (name === "flag") return <svg {...s} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" /></svg>;
  if (name === "bulb") return <svg {...s} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>;
  if (name === "check") return <svg {...s} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  if (name === "user") return <svg {...s} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
  return null;
}
