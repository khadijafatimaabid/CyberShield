"use client";
import React, { useState, useEffect } from "react";
import { getAllTips } from "../lib/api";

const sidebarItems = [
  { icon: "grid", label: "Dashboard", href: "/dashboard" },
  { icon: "flag", label: "Report Threat", href: "/report-threat" },
  { icon: "bulb", label: "Security Tips", href: "/tips", active: true },
  { icon: "user", label: "My Profile", href: "/profile" },
  { icon: "shield", label: "Admin Panel", href: "/admin", admin: true },
];

const categories = ["All", "Passwords", "Phishing", "Privacy", "Social Media", "Devices"];

const iconMap: Record<string, string> = {
  "Passwords": "🔑",
  "Phishing": "🎣",
  "Privacy": "🕵️",
  "Social Media": "📱",
  "Devices": "💻",
};

const colorMap: Record<string, { color: string; bg: string; border: string }> = {
  "Passwords": { color: "#00e5ff", bg: "rgba(0,229,255,0.07)", border: "rgba(0,229,255,0.15)" },
  "Phishing":  { color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.15)" },
  "Privacy":   { color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.15)" },
  "Social Media": { color: "#ec4899", bg: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.15)" },
  "Devices":   { color: "#06b6d4", bg: "rgba(6,182,212,0.07)", border: "rgba(6,182,212,0.15)" },
};

const levelColor: Record<string, string> = {
  BASIC: "#22c55e", Basic: "#22c55e",
  IMPORTANT: "#f97316", Important: "#f97316",
  CRITICAL: "#ef4444", Critical: "#ef4444",
};
const levelBg: Record<string, string> = {
  BASIC: "rgba(34,197,94,0.1)", Basic: "rgba(34,197,94,0.1)",
  IMPORTANT: "rgba(249,115,22,0.1)", Important: "rgba(249,115,22,0.1)",
  CRITICAL: "rgba(239,68,68,0.1)", Critical: "rgba(239,68,68,0.1)",
};

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTips()
      .then((data) => {
        if (Array.isArray(data)) setTips(data);
      })
      .catch(() => console.error("Backend se tips load nahi hue"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tips.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const criticalCount = tips.filter(
    (t) => t.level === "CRITICAL" || t.level === "Critical"
  ).length;

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
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#000" }}>K</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#f1f5f9" }}>Khadija</div>
              <div style={{ fontSize: 11, color: "#475569" }}>User Account</div>
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
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Security Tips</h1>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Stay informed, stay safe 💡</p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input type="text" placeholder="Search tips..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "9px 14px 9px 36px", backgroundColor: "#0a0a0a", border: "1px solid #1e293b", borderRadius: 10, color: "#f1f5f9", fontSize: 13, outline: "none", width: 200, transition: "border-color 0.2s" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
            />
          </div>
        </header>

        <div style={{ padding: 32 }}>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
            {[
              { label: "Total Tips", value: loading ? "..." : tips.length, color: "#00e5ff", bg: "rgba(0,229,255,0.07)", border: "rgba(0,229,255,0.15)" },
              { label: "Critical Tips", value: loading ? "..." : criticalCount, color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.15)" },
              { label: "Categories", value: categories.length - 1, color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.15)" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "18px 20px", borderRadius: 14, backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Category Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", border: "none", transition: "all 0.2s",
                  backgroundColor: activeCategory === cat ? "#00e5ff" : "#0a0a0a",
                  color: activeCategory === cat ? "#000" : "#64748b",
                  boxShadow: activeCategory === cat ? "0 0 15px rgba(0,229,255,0.3)" : "none",
                  outline: activeCategory !== cat ? "1px solid #1e293b" : "none",
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#334155" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#00e5ff" }}>Loading tips...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#334155" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>No tips found</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>Try a different search or category</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filtered.map((tip) => {
                const c = colorMap[tip.category] || { color: "#00e5ff", bg: "rgba(0,229,255,0.07)", border: "rgba(0,229,255,0.15)" };
                const icon = iconMap[tip.category] || "🛡️";
                return (
                  <div key={tip.id} style={{
                    borderRadius: 18, overflow: "hidden",
                    backgroundColor: "#050505",
                    border: `1px solid ${expandedId === tip.id ? c.border : "#0f172a"}`,
                    transition: "all 0.3s", cursor: "pointer",
                  }}
                    onMouseEnter={(e) => { if (expandedId !== tip.id) e.currentTarget.style.borderColor = c.border; }}
                    onMouseLeave={(e) => { if (expandedId !== tip.id) e.currentTarget.style.borderColor = "#0f172a"; }}
                  >
                    <div style={{ padding: "22px 22px 18px", backgroundColor: c.bg }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <span style={{ fontSize: 32 }}>{icon}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
                          backgroundColor: levelBg[tip.level] || "rgba(34,197,94,0.1)",
                          color: levelColor[tip.level] || "#22c55e",
                          letterSpacing: "0.5px",
                        }}>{tip.level}</span>
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: c.color, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>{tip.category}</div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px", color: "#f1f5f9" }}>{tip.title}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{tip.content.substring(0, 80)}...</p>
                    </div>

                    {expandedId === tip.id && (
                      <div style={{ padding: "16px 22px", borderTop: `1px solid ${c.border}` }}>
                        <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>{tip.content}</p>
                      </div>
                    )}

                    <div style={{ padding: "12px 22px", borderTop: "1px solid #0f172a" }}>
                      <button onClick={() => setExpandedId(expandedId === tip.id ? null : tip.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: c.color, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
                        {expandedId === tip.id ? "Show Less ↑" : "Read More ↓"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`* { box-sizing: border-box; } input::placeholder { color: #334155; }`}</style>
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
