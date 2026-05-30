"use client";
import React, { useState } from "react";
import { submitReport } from "../lib/api";



const threatTypes = [
  { value: "phishing", label: "🎣 Phishing", desc: "Fake login pages or emails stealing credentials" },
  { value: "malware", label: "💀 Malware", desc: "Websites spreading viruses or harmful software" },
  { value: "fake-site", label: "🌐 Fake Website", desc: "Websites impersonating real brands or services" },
  { value: "suspicious-link", label: "🔗 Suspicious Link", desc: "Unknown or shady links from messages or emails" },
  { value: "scam", label: "💸 Online Scam", desc: "Fake offers, prizes, or financial fraud" },
  { value: "other", label: "⚠️ Other", desc: "Any other type of cyber threat" },
];

const sidebarItems = [
  { icon: "grid", label: "Dashboard", href: "/dashboard" },
  { icon: "flag", label: "Report Threat", href: "/report-threat", active: true },
  { icon: "bulb", label: "Security Tips", href: "/tips" },
  { icon: "user", label: "My Profile", href: "/profile" },
  { icon: "shield", label: "Admin Panel", href: "/admin", admin: true },
];

export default function ReportThreat() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    threatType: "",
    url: "",
    description: "",
    fileName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.threatType) { setError("Please select a threat type."); return; }
    if (!form.url) { setError("Please enter the suspicious URL."); return; }
    if (!form.description || form.description.length < 20) {
      setError("Please describe the threat (min. 20 characters).");
      return;
    }
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId") || "1";
      const result = await submitReport({
        userId,
        threatType: form.threatType,
        url: form.url,
        description: form.description,
      });
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Server error?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#000000", minHeight: "100vh",
      display: "flex", fontFamily: "sans-serif",
      color: "#fff",
    }}>

      {/* BG GRID */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,255,0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      {/* ══════════ SIDEBAR ══════════ */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 240,
        backgroundColor: "#050505",
        borderRight: "1px solid #0f172a",
        display: "flex", flexDirection: "column", zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #0f172a", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: 18 }}>Cyber<span style={{ color: "#00e5ff" }}>Shield</span></span>
        </div>

        {/* Nav */}
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {sidebarItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 14px", borderRadius: 10, marginBottom: 4,
              textDecoration: "none",
              backgroundColor: item.active ? "rgba(239,68,68,0.08)" : "transparent",
              border: item.active ? "1px solid rgba(239,68,68,0.2)" : "1px solid transparent",
              color: item.active ? "#f87171" : item.admin ? "#a78bfa" : "#64748b",
              fontSize: 14, fontWeight: item.active ? 600 : 400,
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { if (!item.active) { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#fff"; } }}
              onMouseLeave={(e) => { if (!item.active) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = item.admin ? "#a78bfa" : "#64748b"; } }}
            >
              <SidebarIcon name={item.icon} />
              {item.label}
              {item.admin && (
                <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 99, backgroundColor: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>ADMIN</span>
              )}
            </a>
          ))}
        </nav>

        {/* User */}
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
          position: "sticky", top: 0, zIndex: 30,
          padding: "16px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #0f172a",
        }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Report a Threat</h1>
            <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>Help protect the community 🛡️</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="/dashboard" style={{
              padding: "9px 18px", fontSize: 13, color: "#64748b",
              border: "1px solid #1e293b", borderRadius: 9, textDecoration: "none",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
            >← Dashboard</a>
          </div>
        </header>

        <div style={{ padding: 32, maxWidth: 760, margin: "0 auto" }}>

          {/* SUCCESS STATE */}
          {submitted ? (
            <div style={{
              textAlign: "center", padding: "80px 40px",
              backgroundColor: "#050505", borderRadius: 24,
              border: "1px solid rgba(34,197,94,0.2)",
              boxShadow: "0 0 60px rgba(34,197,94,0.05)",
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%", margin: "0 auto 24px",
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#22c55e", margin: "0 0 12px" }}>Report Submitted!</h2>
              <p style={{ color: "#475569", fontSize: 15, margin: "0 0 32px", lineHeight: 1.7 }}>
                Thank you for helping keep the community safe.<br />Our team will review your report shortly.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={() => { setSubmitted(false); setForm({ threatType: "", url: "", description: "", fileName: "" }); setStep(1); }}
                  style={{
                    padding: "12px 28px", backgroundColor: "rgba(0,229,255,0.08)",
                    border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff",
                    borderRadius: 12, cursor: "pointer", fontWeight: 600, fontSize: 14,
                  }}>
                  Report Another
                </button>
                <a href="/dashboard" style={{
                  padding: "12px 28px", backgroundColor: "#00e5ff", color: "#000",
                  borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14,
                  boxShadow: "0 0 25px rgba(0,229,255,0.35)",
                }}>Go to Dashboard</a>
              </div>
            </div>
          ) : (
            <>
              {/* STEP INDICATOR */}
              <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
                {["Select Type", "Add Details", "Review"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: "50%",
                        backgroundColor: step > i + 1 ? "#22c55e" : step === i + 1 ? "#00e5ff" : "#0f172a",
                        border: `1px solid ${step > i + 1 ? "#22c55e" : step === i + 1 ? "#00e5ff" : "#1e293b"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 800,
                        color: step > i + 1 ? "#000" : step === i + 1 ? "#000" : "#334155",
                        transition: "all 0.3s",
                      }}>
                        {step > i + 1 ? (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: step === i + 1 ? "#f1f5f9" : "#334155", fontWeight: step === i + 1 ? 600 : 400 }}>{s}</span>
                    </div>
                    {i < 2 && <div style={{ flex: 1, height: 1, backgroundColor: step > i + 1 ? "#22c55e" : "#0f172a", margin: "0 12px", transition: "all 0.3s" }} />}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit}>

                {/* ── STEP 1: Threat Type ── */}
                {step === 1 && (
                  <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>What type of threat did you encounter?</h2>
                    <p style={{ color: "#475569", fontSize: 13, margin: "0 0 24px" }}>Select the category that best describes the threat</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {threatTypes.map((t) => (
                        <div key={t.value}
                          onClick={() => setForm({ ...form, threatType: t.value })}
                          style={{
                            padding: "16px 18px", borderRadius: 14, cursor: "pointer",
                            backgroundColor: form.threatType === t.value ? "rgba(239,68,68,0.08)" : "#0a0a0a",
                            border: `1px solid ${form.threatType === t.value ? "rgba(239,68,68,0.4)" : "#1a1a2e"}`,
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => { if (form.threatType !== t.value) e.currentTarget.style.borderColor = "#1e293b"; }}
                          onMouseLeave={(e) => { if (form.threatType !== t.value) e.currentTarget.style.borderColor = "#1a1a2e"; }}
                        >
                          <div style={{ fontSize: 22, marginBottom: 8 }}>{t.label.split(" ")[0]}</div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: form.threatType === t.value ? "#f87171" : "#e2e8f0", marginBottom: 4 }}>
                            {t.label.split(" ").slice(1).join(" ")}
                          </div>
                          <div style={{ fontSize: 11, color: "#334155", lineHeight: 1.5 }}>{t.desc}</div>
                          {form.threatType === t.value && (
                            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, color: "#f87171", fontSize: 11, fontWeight: 700 }}>
                              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              Selected
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button type="button"
                      onClick={() => { if (!form.threatType) { setError("Please select a threat type."); return; } setError(""); setStep(2); }}
                      style={{
                        marginTop: 24, width: "100%", padding: "13px",
                        backgroundColor: form.threatType ? "#00e5ff" : "#0f172a",
                        color: form.threatType ? "#000" : "#334155",
                        fontWeight: 800, fontSize: 15, border: "none", borderRadius: 12,
                        cursor: form.threatType ? "pointer" : "not-allowed",
                        boxShadow: form.threatType ? "0 0 25px rgba(0,229,255,0.3)" : "none",
                        transition: "all 0.2s",
                      }}>
                      Continue →
                    </button>
                    {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 10, textAlign: "center" }}>{error}</p>}
                  </div>
                )}

                {/* ── STEP 2: Details ── */}
                {step === 2 && (
                  <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>Provide threat details</h2>
                    <p style={{ color: "#475569", fontSize: 13, margin: "0 0 24px" }}>The more detail you give, the better we can act</p>

                    {/* URL */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, letterSpacing: "0.5px" }}>
                        SUSPICIOUS URL / LINK <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                          </svg>
                        </div>
                        <input
                          type="text" placeholder="https://suspicious-site.com"
                          value={form.url}
                          onChange={(e) => setForm({ ...form, url: e.target.value })}
                          style={{
                            width: "100%", padding: "13px 14px 13px 42px",
                            backgroundColor: "#0a0a0a", border: "1px solid #1e293b",
                            borderRadius: 12, color: "#f1f5f9", fontSize: 14,
                            outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.5px" }}>
                          DESCRIPTION <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <span style={{ fontSize: 11, color: form.description.length >= 20 ? "#22c55e" : "#475569" }}>
                          {form.description.length}/20 min
                        </span>
                      </div>
                      <textarea
                        placeholder="Describe what happened — where you found this link, what it asked you to do, any other suspicious behavior..."
                        rows={5}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        style={{
                          width: "100%", padding: "13px 16px",
                          backgroundColor: "#0a0a0a", border: "1px solid #1e293b",
                          borderRadius: 12, color: "#f1f5f9", fontSize: 14,
                          outline: "none", resize: "vertical",
                          transition: "border-color 0.2s", boxSizing: "border-box",
                          fontFamily: "sans-serif", lineHeight: 1.6,
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                      />
                    </div>

                    {/* File Upload */}
                    <div style={{ marginBottom: 24 }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, letterSpacing: "0.5px" }}>
                        SCREENSHOT (OPTIONAL)
                      </label>
                      <label style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: 10, padding: "18px", borderRadius: 12, cursor: "pointer",
                        border: "1.5px dashed #1e293b",
                        backgroundColor: "#0a0a0a", transition: "all 0.2s",
                        color: form.fileName ? "#22c55e" : "#475569", fontSize: 13,
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
                      >
                        {form.fileName ? (
                          <>
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {form.fileName}
                          </>
                        ) : (
                          <>
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Click to upload screenshot (PNG, JPG, max 5MB)
                          </>
                        )}
                        <input type="file" accept="image/*" style={{ display: "none" }}
                          onChange={(e) => setForm({ ...form, fileName: e.target.files?.[0]?.name || "" })}
                        />
                      </label>
                    </div>

                    {error && (
                      <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 16, backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontSize: 13 }}>
                        ⚠️ {error}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 12 }}>
                      <button type="button" onClick={() => { setStep(1); setError(""); }}
                        style={{
                          flex: 1, padding: "13px", backgroundColor: "transparent",
                          border: "1px solid #1e293b", color: "#64748b",
                          borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
                      >← Back</button>
                      <button type="button"
                        onClick={() => { if (!form.url) { setError("Please enter the suspicious URL."); return; } if (!form.description || form.description.length < 20) { setError("Description must be at least 20 characters."); return; } setError(""); setStep(3); }}
                        style={{
                          flex: 2, padding: "13px",
                          backgroundColor: "#00e5ff", color: "#000",
                          fontWeight: 800, fontSize: 15, border: "none", borderRadius: 12,
                          cursor: "pointer", boxShadow: "0 0 25px rgba(0,229,255,0.3)",
                          transition: "all 0.2s",
                        }}>
                        Review Report →
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Review ── */}
                {step === 3 && (
                  <div style={{ backgroundColor: "#050505", borderRadius: 20, border: "1px solid #0f172a", padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>Review your report</h2>
                    <p style={{ color: "#475569", fontSize: 13, margin: "0 0 24px" }}>Please confirm everything looks correct before submitting</p>

                    {/* Review Items */}
                    {[
                      { label: "Threat Type", value: threatTypes.find(t => t.value === form.threatType)?.label || "" },
                      { label: "Suspicious URL", value: form.url },
                      { label: "Description", value: form.description },
                      { label: "Screenshot", value: form.fileName || "Not provided" },
                    ].map((item) => (
                      <div key={item.label} style={{
                        padding: "16px", borderRadius: 12, marginBottom: 12,
                        backgroundColor: "#0a0a0a", border: "1px solid #0f172a",
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "1px", marginBottom: 6, textTransform: "uppercase" }}>{item.label}</div>
                        <div style={{ fontSize: 14, color: "#e2e8f0", lineHeight: 1.6, wordBreak: "break-all" }}>{item.value}</div>
                      </div>
                    ))}

                    {/* Warning */}
                    <div style={{
                      padding: "12px 16px", borderRadius: 10, marginBottom: 20,
                      backgroundColor: "rgba(234,179,8,0.06)",
                      border: "1px solid rgba(234,179,8,0.2)", color: "#fbbf24", fontSize: 12,
                      display: "flex", alignItems: "flex-start", gap: 8,
                    }}>
                      <span style={{ flexShrink: 0, marginTop: 1 }}>⚠️</span>
                      <span>By submitting this report, you confirm this information is accurate. False reports may result in account suspension.</span>
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                      <button type="button" onClick={() => setStep(2)}
                        style={{
                          flex: 1, padding: "13px", backgroundColor: "transparent",
                          border: "1px solid #1e293b", color: "#64748b",
                          borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600,
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}
                      >← Edit</button>
                      <button type="submit" disabled={loading}
                        style={{
                          flex: 2, padding: "13px",
                          backgroundColor: loading ? "rgba(239,68,68,0.5)" : "#ef4444",
                          color: "#fff", fontWeight: 800, fontSize: 15,
                          border: "none", borderRadius: 12,
                          cursor: loading ? "not-allowed" : "pointer",
                          boxShadow: loading ? "none" : "0 0 25px rgba(239,68,68,0.35)",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          transition: "all 0.2s",
                        }}>
                        {loading ? (
                          <>
                            <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Submitting...
                          </>
                        ) : "🚨 Submit Report"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        textarea::placeholder, input::placeholder { color: #334155; }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          aside { display: none; }
          .main-content { margin-left: 0 !important; }
        }
      `}</style>
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





