"use client";
import { useState } from "react";
import { loginUser } from "../lib/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);
  try {
    const result = await loginUser({ email, password });

    if (result.error) {
      setError(result.error);
    } else {
      // User info save karo
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("userName", result.name);
      localStorage.setItem("userRole", result.role);

      // Redirect
      if (result.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    }
  } catch {
    setError("Server error. Make sure backend is running!");
  } finally {
    setLoading(false);
  }
};

  return (
    <main style={{
      backgroundColor: "#000000", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      fontFamily: "sans-serif", color: "#fff", overflowX: "hidden",
    }}>

      {/* ── BACKGROUND GRID ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      {/* ── GLOW ── */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)",
      }} />

      {/* ════════════════ NAVBAR ════════════════ */}
      <nav style={{
        position: "relative", zIndex: 10,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(0,229,255,0.08)",
      }}>
        <a href="/" style={{
          display: "flex", alignItems: "center", gap: 10, textDecoration: "none",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>
            Cyber<span style={{ color: "#00e5ff" }}>Shield</span>
          </span>
        </a>

        <a href="/register" style={{
          padding: "9px 20px", fontSize: 13, color: "#94a3b8",
          border: "1px solid #1e293b", borderRadius: 9,
          textDecoration: "none", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}
        >Create Account</a>
      </nav>

      {/* ════════════════ LOGIN CARD ════════════════ */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "40px 24px",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          width: "100%", maxWidth: 460,
          backgroundColor: "#050505",
          border: "1px solid #0f172a",
          borderRadius: 24, padding: "44px 40px",
          boxShadow: "0 0 60px rgba(0,229,255,0.05)",
        }}>

          {/* Icon */}
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: "0 auto 24px",
            background: "rgba(0,229,255,0.08)",
            border: "1px solid rgba(0,229,255,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 28, fontWeight: 900, textAlign: "center", margin: "0 0 6px" }}>
            Welcome Back
          </h1>
          <p style={{ color: "#475569", fontSize: 14, textAlign: "center", margin: "0 0 36px" }}>
            Login to your CyberShield account
          </p>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: "12px 16px", borderRadius: 10, marginBottom: 20,
              backgroundColor: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Email Field */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 8, letterSpacing: "0.5px" }}>
                EMAIL ADDRESS
              </label>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: "13px 14px 13px 42px",
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #1e293b",
                    borderRadius: 12, color: "#f1f5f9", fontSize: 14,
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.5px" }}>
                  PASSWORD
                </label>
                <a href="#" style={{ fontSize: 12, color: "#00e5ff", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                >Forgot Password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#475569" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%", padding: "13px 44px 13px 42px",
                    backgroundColor: "#0a0a0a",
                    border: "1px solid #1e293b",
                    borderRadius: 12, color: "#f1f5f9", fontSize: 14,
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,229,255,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "#1e293b")}
                />
                {/* Show/Hide Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    color: "#475569", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  {showPassword ? (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                backgroundColor: loading ? "rgba(0,229,255,0.5)" : "#00e5ff",
                color: "#000", fontWeight: 800, fontSize: 15,
                border: "none", borderRadius: 12, cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 0 30px rgba(0,229,255,0.4)",
                transition: "all 0.2s", marginTop: 4,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.backgroundColor = "#00cfeb"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,229,255,0.6)"; } }}
              onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.backgroundColor = "#00e5ff"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.4)"; } }}
            >
              {loading ? (
                <>
                  <svg style={{ animation: "spin 1s linear infinite" }} width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  Login to CyberShield
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0" }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "#0f172a" }} />
            <span style={{ color: "#334155", fontSize: 12 }}>OR</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#0f172a" }} />
          </div>

          {/* Register Link */}
          <p style={{ textAlign: "center", fontSize: 14, color: "#475569", margin: 0 }}>
            Don&apos;t have an account?{" "}
            <a href="/register" style={{ color: "#00e5ff", textDecoration: "none", fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >Create one free →</a>
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "20px", borderTop: "1px solid #0a0a0a" }}>
        <p style={{ color: "#1e293b", fontSize: 12, margin: 0 }}>© 2026 CyberShield. Secure login protected.</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #334155; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}