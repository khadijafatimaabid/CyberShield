"use client";
import React, { useState } from "react";
import { useEffect } from "react";

const sidebarItems = [
  { icon: "grid", label: "Dashboard", href: "/dashboard" },
  { icon: "flag", label: "Report Threat", href: "/report-threat" },
  { icon: "bulb", label: "Security Tips", href: "/tips" },
  { icon: "user", label: "My Profile", href: "/profile", active: true },
  { icon: "shield", label: "Admin Panel", href: "/admin", admin: true },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "activity">("profile");
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "Khadija Khan",
    email: "khadija@email.com",
    phone: "+92 300 1234567",
    city: "Lahore",
    bio: "Cybersecurity enthusiast. Keeping the digital world safe one report at a time.",
  });

  useEffect(() => {
  const name = localStorage.getItem("userName") || "Khadija Khan";
  const email = localStorage.getItem("userEmail") || "khadija@email.com";
  setForm(prev => ({ ...prev, name, email }));
}, []);

  const [pwForm, setPwForm] = useState({ old: "", newPw: "", confirm: "" });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePwSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPwSaved(true);
    setPwForm({ old: "", newPw: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 2500);
  };

  const activityLog = [
    { icon: "🚨", text: "Reported phishing link: fake-paypal.com", time: "2 hours ago", color: "#ef4444" },
    { icon: "💡", text: "Read tip: Enable Two-Factor Authentication", time: "5 hours ago", color: "#00e5ff" },
    { icon: "🔐", text: "Password changed successfully", time: "Yesterday", color: "#22c55e" },
    { icon: "🚨", text: "Reported fake site: amazon-deals-pk.com", time: "2 days ago", color: "#ef4444" },
    { icon: "✅", text: "Account email verified", time: "3 days ago", color: "#22c55e" },
    { icon: "👤", text: "Profile setup completed", time: "Jan 10, 2025", color: "#a78bfa" },
    { icon: "🎉", text: "Account created on CyberShield", time: "Jan 10, 2025", color: "#00e5ff" },
  ];

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
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>My Profile</h1>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Manage your account settings 👤</p>
          </div>
          <a href="/dashboard" style={{
            padding: "9px 18px", fontSize: 13, color: "#64748b",
            border: "1px solid #1e293b", borderRadius: 9, textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
          >← Dashboard</a>
        </header>

        <div style={{ padding: 32 }}>

          {/* ── PROFILE HERO CARD ── */}
          <div style={{
            padding: 28, borderRadius: 20, marginBottom: 24,
            background: "linear-gradient(135deg, #050510 0%, #0a0a20 50%, #050510 100%)",
            border: "1px solid rgba(0,229,255,0.1)",
            display: "flex", alignItems: "center", gap: 24,
            position: "relative", overflow: "hidden",
          }}>
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 80, height: 80, borderTop: "2px solid rgba(0,229,255,0.3)", borderLeft: "2px solid rgba(0,229,255,0.3)", borderRadius: "20px 0 0 0" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 80, height: 80, borderBottom: "2px solid rgba(0,229,255,0.3)", borderRight: "2px solid rgba(0,229,255,0.3)", borderRadius: "0 0 20px 0" }} />

            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 90, height: 90, borderRadius: "50%",
                background: "linear-gradient(135deg, #00e5ff, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 900, color: "#000",
                boxShadow: "0 0 30px rgba(0,229,255,0.3)",
              }}>K</div>
              <div style={{
                position: "absolute", bottom: 2, right: 2,
                width: 18, height: 18, borderRadius: "50%",
                backgroundColor: "#22c55e", border: "2px solid #000",
              }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 4px" }}>{form.name}</h2>
              <p style={{ color: "#475569", fontSize: 14, margin: "0 0 14px" }}>{form.email}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { label: "📋 12 Reports", color: "#00e5ff", bg: "rgba(0,229,255,0.08)", border: "rgba(0,229,255,0.2)" },
                  { label: "🔒 78% Score", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
                  { label: "📍 Lahore, PK", color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)" },
                ].map((badge) => (
                  <span key={badge.label} style={{
                    padding: "5px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                    backgroundColor: badge.bg, border: `1px solid ${badge.border}`, color: badge.color,
                  }}>{badge.label}</span>
                ))}
              </div>
            </div>

            {/* Member Since */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: "#334155", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Member Since</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#64748b" }}>Jan 2025</div>
            </div>
          </div>

          {/* ── TABS ── */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24, backgroundColor: "#050505", padding: 4, borderRadius: 12, border: "1px solid #0f172a", width: "fit-content" }}>
            {([
              { key: "profile", label: "👤 Edit Profile" },
              { key: "security", label: "🔐 Security" },
              { key: "activity", label: "📋 Activity" },
            ] as const).map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "9px 22px", borderRadius: 9, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, transition: "all 0.2s",
                  backgroundColor: activeTab === tab.key ? "#00e5ff" : "transparent",
                  color: activeTab === tab.key ? "#000" : "#64748b",
                  boxShadow: activeTab === tab.key ? "0 0 15px rgba(0,229,255,0.3)" : "none",
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ══════════ EDIT PROFILE TAB ══════════ */}
          {activeTab === "profile" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
              <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 24px", color: "#f1f5f9" }}>Personal Information</h3>

                {saved && (
                  <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 20, backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Profile updated successfully!
                  </div>
                )}

                <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {/* Name */}
                    <div>
                      <label style={labelStyle}>FULL NAME</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                    </div>
                    {/* Email */}
                    <div>
                      <label style={labelStyle}>EMAIL ADDRESS</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                    </div>
                    {/* Phone */}
                    <div>
                      <label style={labelStyle}>PHONE NUMBER</label>
                      <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                    </div>
                    {/* City */}
                    <div>
                      <label style={labelStyle}>CITY</label>
                      <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                    </div>
                  </div>
                  {/* Bio */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <label style={labelStyle}>BIO</label>
                      <span style={{ fontSize: 11, color: "#334155" }}>{form.bio.length}/160</span>
                    </div>
                    <textarea value={form.bio} rows={3}
                      onChange={(e) => setForm({ ...form, bio: e.target.value.slice(0, 160) })}
                      style={{ ...inputStyle, padding: "13px 16px", resize: "vertical", fontFamily: "sans-serif", lineHeight: 1.6 }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                  </div>

                  <button type="submit" style={{
                    padding: "13px", backgroundColor: "#00e5ff", color: "#000",
                    fontWeight: 800, fontSize: 15, border: "none", borderRadius: 12,
                    cursor: "pointer", boxShadow: "0 0 25px rgba(0,229,255,0.3)", transition: "all 0.2s",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00cfeb"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.5)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#00e5ff"; e.currentTarget.style.boxShadow = "0 0 25px rgba(0,229,255,0.3)"; }}
                  >Save Changes</button>
                </form>
              </div>

              {/* Right — Avatar + Stats */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Avatar Card */}
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 24, textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#000", margin: "0 auto 16px", boxShadow: "0 0 25px rgba(0,229,255,0.25)" }}>K</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{form.name}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginBottom: 16 }}>CyberShield Member</div>
                  <button style={{ width: "100%", padding: "10px", backgroundColor: "#0a0a0a", border: "1px solid #1e293b", color: "#64748b", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
                  >📷 Change Avatar</button>
                </div>

                {/* Quick Stats */}
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#475569", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Your Stats</div>
                  {[
                    { label: "Total Reports", value: "12", color: "#00e5ff" },
                    { label: "Pending", value: "3", color: "#f97316" },
                    { label: "Reviewed", value: "9", color: "#22c55e" },
                    { label: "Security Score", value: "78%", color: "#a78bfa" },
                  ].map((s) => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #0f172a" }}>
                      <span style={{ fontSize: 13, color: "#64748b" }}>{s.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══════════ SECURITY TAB ══════════ */}
          {activeTab === "security" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

              {/* Change Password */}
              <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px" }}>Change Password</h3>
                <p style={{ fontSize: 13, color: "#475569", margin: "0 0 24px" }}>Choose a strong password with 8+ characters</p>

                {pwSaved && (
                  <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 20, backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    Password updated successfully!
                  </div>
                )}

                <form onSubmit={handlePwSave} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { label: "CURRENT PASSWORD", key: "old", show: showOld, toggle: () => setShowOld(!showOld), val: pwForm.old, onChange: (v: string) => setPwForm({ ...pwForm, old: v }) },
                    { label: "NEW PASSWORD", key: "newPw", show: showNew, toggle: () => setShowNew(!showNew), val: pwForm.newPw, onChange: (v: string) => setPwForm({ ...pwForm, newPw: v }) },
                    { label: "CONFIRM NEW PASSWORD", key: "confirm", show: showConfirm, toggle: () => setShowConfirm(!showConfirm), val: pwForm.confirm, onChange: (v: string) => setPwForm({ ...pwForm, confirm: v }) },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={labelStyle}>{f.label}</label>
                      <div style={{ position: "relative" }}>
                        <input type={f.show ? "text" : "password"} value={f.val} placeholder="••••••••"
                          onChange={(e) => f.onChange(e.target.value)}
                          style={{ ...inputStyle, paddingRight: 44 }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "#1e293b")} />
                        <button type="button" onClick={f.toggle}
                          style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#475569" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}>
                          {f.show
                            ? <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                            : <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="submit" style={{ padding: "13px", backgroundColor: "#00e5ff", color: "#000", fontWeight: 800, fontSize: 15, border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 0 25px rgba(0,229,255,0.3)", marginTop: 4, transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00cfeb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#00e5ff"; }}
                  >Update Password</button>
                </form>
              </div>

              {/* Security Settings */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* 2FA */}
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 6px" }}>Two-Factor Authentication</h3>
                  <p style={{ fontSize: 13, color: "#475569", margin: "0 0 18px" }}>Add an extra layer of security to your account</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, backgroundColor: "#0a0a0a", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>🔐</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Authenticator App</div>
                        <div style={{ fontSize: 11, color: "#ef4444" }}>Not enabled</div>
                      </div>
                    </div>
                    <button style={{ padding: "7px 16px", backgroundColor: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: 9, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Enable</button>
                  </div>
                </div>

                {/* Security Checklist */}
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px" }}>Security Checklist</h3>
                  {[
                    { label: "Strong Password", done: true },
                    { label: "Email Verified", done: true },
                    { label: "2FA Enabled", done: false },
                    { label: "Recent Threats Checked", done: false },
                    { label: "Profile Completed", done: true },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #0f172a" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: item.done ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.08)", border: `1px solid ${item.done ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {item.done
                          ? <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                          : <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                      </div>
                      <span style={{ fontSize: 13, color: item.done ? "#94a3b8" : "#64748b" }}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Danger Zone */}
                <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid rgba(239,68,68,0.15)", padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 6px", color: "#f87171" }}>Danger Zone</h3>
                  <p style={{ fontSize: 12, color: "#475569", margin: "0 0 14px" }}>Permanent actions — cannot be undone</p>
                  <button style={{ width: "100%", padding: "11px", backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)")}
                  >🗑 Delete Account</button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════ ACTIVITY TAB ══════════ */}
          {activeTab === "activity" && (
            <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28, maxWidth: 680 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 24px" }}>Activity Log</h3>
              <div style={{ position: "relative" }}>
                {/* Timeline line */}
                <div style={{ position: "absolute", left: 17, top: 0, bottom: 0, width: 1, backgroundColor: "#0f172a" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {activityLog.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "0 0 24px", position: "relative" }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                        backgroundColor: "#0a0a0a", border: `1px solid ${item.color}30`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, zIndex: 1,
                      }}>{item.icon}</div>
                      <div style={{ flex: 1, paddingTop: 6 }}>
                        <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: 500, marginBottom: 4 }}>{item.text}</div>
                        <div style={{ fontSize: 11, color: "#334155" }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #334155; }
      `}</style>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 600,
  color: "#94a3b8", marginBottom: 8, letterSpacing: "0.5px",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "13px 14px",
  backgroundColor: "#0a0a0a", border: "1px solid #1e293b",
  borderRadius: 12, color: "#f1f5f9", fontSize: 14,
  outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
};

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