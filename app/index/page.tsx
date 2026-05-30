"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main style={{ backgroundColor: "#000000", color: "#ffffff", minHeight: "100vh", fontFamily: "sans-serif", overflowX: "hidden" }}>

      {/* ── BACKGROUND GRID ── */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      {/* ── GLOW ORBS ── */}
      <div style={{
        position: "fixed", top: -300, left: -300, width: 700, height: 700,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "fixed", bottom: -300, right: -300, width: 700, height: 700,
        borderRadius: "50%", pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
      }} />

      {/* ════════════════ NAVBAR ════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,255,0.1)" : "none",
        transition: "all 0.3s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "rgba(0,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px" }}>
            Cyber<span style={{ color: "#00e5ff" }}>Shield</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 36 }}>
          {["Features", "How It Works", "Threats", "Tips"].map((item) => (
            <a key={item} href="#" style={{
              color: "#94a3b8", fontSize: 14, textDecoration: "none",
              letterSpacing: "0.5px", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >{item}</a>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/login" style={{
            padding: "10px 22px", fontSize: 14, color: "#cbd5e1",
            border: "1px solid #334155", borderRadius: 10,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.5)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#cbd5e1"; }}
          >Login</a>
          <a href="/register" style={{
            padding: "10px 22px", fontSize: 14, fontWeight: 700,
            backgroundColor: "#00e5ff", color: "#000", borderRadius: 10,
            textDecoration: "none", boxShadow: "0 0 25px rgba(0,229,255,0.35)",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00cfeb"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#00e5ff"; e.currentTarget.style.boxShadow = "0 0 25px rgba(0,229,255,0.35)"; }}
          >Get Started</a>
        </div>
      </nav>

      {/* ════════════════ HERO ════════════════ */}
      <section style={{ position: "relative", zIndex: 10, paddingTop: 160, paddingBottom: 100, textAlign: "center", padding: "160px 24px 100px" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 20px", borderRadius: 999,
          border: "1px solid rgba(0,229,255,0.25)",
          background: "rgba(0,229,255,0.05)",
          color: "#00e5ff", fontSize: 11, fontWeight: 600,
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: 32,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            backgroundColor: "#00e5ff",
            animation: "pulse 1.5s infinite",
          }} />
          Real-Time Cyber Threat Detection
        </div>

        {/* Main Heading */}
        <h1 style={{ fontSize: "clamp(42px, 8vw, 80px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-2px", margin: "0 0 24px" }}>
          Stay Safe in the
          <br />
          <span style={{
            backgroundImage: "linear-gradient(90deg, #00e5ff, #3b82f6, #00e5ff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
          }}>
            Digital World
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: 580, margin: "0 auto 40px",
          color: "#64748b", fontSize: 18, lineHeight: 1.7,
        }}>
          CyberShield detects phishing links, fake websites, and online threats
          before they harm you — powerful protection in one place.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/register" style={{
            padding: "16px 36px", backgroundColor: "#00e5ff", color: "#000",
            fontWeight: 800, fontSize: 16, borderRadius: 12, textDecoration: "none",
            boxShadow: "0 0 40px rgba(0,229,255,0.45)",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00cfeb"; e.currentTarget.style.boxShadow = "0 0 60px rgba(0,229,255,0.65)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#00e5ff"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,229,255,0.45)"; }}
          >Start Protecting Yourself →</a>
          <a href="#features" style={{
            padding: "16px 36px", color: "#94a3b8",
            border: "1px solid #1e293b", borderRadius: 12,
            fontWeight: 500, fontSize: 16, textDecoration: "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.color = "#94a3b8"; }}
          >See How It Works</a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 64, marginTop: 80, flexWrap: "wrap" }}>
          {[
            { value: "10K+", label: "Threats Reported" },
            { value: "99%", label: "Detection Rate" },
            { value: "5K+", label: "Users Protected" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#00e5ff" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section id="features" style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#00e5ff", fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Features</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: 0 }}>Everything You Need</h2>
            <p style={{ color: "#475569", marginTop: 16, fontSize: 16 }}>Powerful tools to keep you safe from all online threats</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              {
                icon: "⚠️", color: "#ef4444", tagBg: "rgba(239,68,68,0.1)", tagColor: "#f87171",
                borderHover: "rgba(239,68,68,0.4)", tag: "AI Powered",
                title: "Threat Detection",
                desc: "Instantly analyze suspicious URLs. Our system flags phishing attempts, malware sites, and fake login pages in real time.",
              },
              {
                icon: "📋", color: "#00e5ff", tagBg: "rgba(0,229,255,0.1)", tagColor: "#00e5ff",
                borderHover: "rgba(0,229,255,0.4)", tag: "Community",
                title: "Report Threats",
                desc: "Submit suspicious websites and phishing links to our database. Help protect the entire community from danger.",
              },
              {
                icon: "💡", color: "#3b82f6", tagBg: "rgba(59,130,246,0.1)", tagColor: "#60a5fa",
                borderHover: "rgba(59,130,246,0.4)", tag: "Education",
                title: "Security Tips",
                desc: "Learn how to protect yourself with expert tips on passwords, phishing, social engineering, and privacy.",
              },
            ].map((f) => (
              <div key={f.title}
                style={{
                  padding: 32, borderRadius: 20,
                  backgroundColor: "#0a0a0a",
                  border: "1px solid #1a1a2e",
                  transition: "border-color 0.3s, transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = f.borderHover;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a2e";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
                <span style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 999,
                  backgroundColor: f.tagBg, color: f.tagColor,
                  fontSize: 11, fontWeight: 600, letterSpacing: "1px", marginBottom: 16,
                }}>{f.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 12px", color: "#f1f5f9" }}>{f.title}</h3>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#00e5ff", fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Process</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: 0 }}>How It Works</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {[
              { step: "01", title: "Create Account", desc: "Sign up for free and set up your CyberShield profile in under 2 minutes." },
              { step: "02", title: "Report or Scan", desc: "Paste suspicious links or report threats you've encountered online." },
              { step: "03", title: "Stay Protected", desc: "Get alerts, read tips, and keep your digital life safe every day." },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div style={{
                  width: 80, height: 80, margin: "0 auto 24px",
                  borderRadius: 20, backgroundColor: "#050505",
                  border: "1px solid rgba(0,229,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#00e5ff" }}>{s.step}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ THREATS ════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p style={{ color: "#ef4444", fontSize: 11, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Threats We Cover</p>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: 0 }}>Know Your Enemy</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: "🎣", title: "Phishing", count: "3.4B attacks/day" },
              { icon: "💀", title: "Malware", count: "450K attacks/day" },
              { icon: "🌐", title: "Fake Sites", count: "1.5M+ active" },
              { icon: "🔗", title: "Bad Links", count: "18M links/day" },
            ].map((t) => (
              <div key={t.title}
                style={{
                  padding: "28px 20px", borderRadius: 16, textAlign: "center",
                  backgroundColor: "#050505",
                  border: "1px solid #1a1a2e",
                  cursor: "pointer", transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a2e";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{t.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#f1f5f9" }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#475569", marginTop: 6 }}>{t.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA BANNER ════════════════ */}
      <section style={{ position: "relative", zIndex: 10, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            position: "relative", borderRadius: 28, padding: "70px 40px",
            textAlign: "center", overflow: "hidden",
            background: "linear-gradient(135deg, #050510 0%, #0a0a20 50%, #050510 100%)",
            border: "1px solid rgba(0,229,255,0.15)",
            boxShadow: "0 0 80px rgba(0,229,255,0.07) inset",
          }}>
            {/* Corner accents */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: 100, height: 100,
              borderTop: "2px solid rgba(0,229,255,0.4)",
              borderLeft: "2px solid rgba(0,229,255,0.4)",
              borderRadius: "28px 0 0 0",
            }} />
            <div style={{
              position: "absolute", bottom: 0, right: 0, width: 100, height: 100,
              borderBottom: "2px solid rgba(0,229,255,0.4)",
              borderRight: "2px solid rgba(0,229,255,0.4)",
              borderRadius: "0 0 28px 0",
            }} />

            <h2 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 900, margin: "0 0 16px" }}>
              Ready to Stay <span style={{ color: "#00e5ff" }}>Secure?</span>
            </h2>
            <p style={{ color: "#475569", fontSize: 17, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
              Join thousands of users who trust CyberShield to protect their digital lives every day.
            </p>
            <a href="/register" style={{
              display: "inline-block", padding: "18px 44px",
              backgroundColor: "#00e5ff", color: "#000",
              fontWeight: 900, fontSize: 17, borderRadius: 14,
              textDecoration: "none",
              boxShadow: "0 0 50px rgba(0,229,255,0.5)",
              transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#00cfeb"; e.currentTarget.style.boxShadow = "0 0 70px rgba(0,229,255,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#00e5ff"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,229,255,0.5)"; }}
            >Create Free Account →</a>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid #0f172a",
        padding: "40px 40px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#00e5ff" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Cyber<span style={{ color: "#00e5ff" }}>Shield</span></span>
        </div>

        <div style={{ display: "flex", gap: 32 }}>
          {["Privacy", "Terms", "Contact", "About"].map((item) => (
            <a key={item} href="#" style={{ color: "#334155", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00e5ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
            >{item}</a>
          ))}
        </div>

        <p style={{ color: "#1e293b", fontSize: 12, margin: 0 }}>© 2025 CyberShield. All rights reserved.</p>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}