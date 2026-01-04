"use client";

import { useEffect, useState } from "react";

async function getTherapists() {
  const res = await fetch("https://ei-backend-04up.onrender.com/therapists", {
    cache: "no-store",
  });
  return res.json();
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [therapists, setTherapists] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const url = "https://ei-backend-04up.onrender.com/";
    fetch(url)
      .then((res) => res.text())
      .then((text) => setApiStatus(text))
      .catch(() => setApiStatus("Cannot reach backend"));
  }, []);

  useEffect(() => {
    getTherapists()
      .then((data) => setTherapists(data))
      .catch(() => setTherapists([]));
  }, []);

  useEffect(() => {
    fetch("https://ei-backend-04up.onrender.com/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch(() => setFaqs([]));
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#1f3b32",
        color: "white",
      }}
    >
      {/* Top nav */}
      <header
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20 }}>EI_HealthCare</div>
        <nav
          style={{
            display: "flex",
            gap: 24,
            fontSize: 14,
            alignItems: "center",
          }}
        >
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            About
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            FAQ
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Therapists
          </a>
          <button
            style={{
              background: "transparent",
              border: "1px solid #fff",
              borderRadius: 20,
              padding: "6px 14px",
              color: "white",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            style={{
              background: "#f3b343",
              borderRadius: 20,
              padding: "6px 16px",
              border: "none",
              color: "#1f3b32",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Get started
          </button>
        </nav>
      </header>

      {/* Hero + cards */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "32px 24px 48px",
        }}
      >
        <div style={{ maxWidth: 540, marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 40,
              lineHeight: 1.1,
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            You deserve to feel better.
          </h1>
          <p style={{ fontSize: 18, marginBottom: 8 }}>
            Online emotional and mental health support from licensed
            professionals, right from home.
          </p>
          <p style={{ fontSize: 16, opacity: 0.9 }}>
            What type of support are you looking for?
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          <CategoryCard
            title="Individual"
            subtitle="For myself"
            color="#2c6d4f"
          />
          <CategoryCard
            title="Couples"
            subtitle="For me and my partner"
            color="#315f73"
          />
          <CategoryCard title="Teen" subtitle="For my child" color="#a65a24" />
        </div>

        {/* Backend + dynamic data */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Backend status</h2>
          <p>{apiStatus}</p>

          <h2 style={{ fontSize: 20, margin: "24px 0 8px" }}>
            Available therapists
          </h2>
          {therapists.length === 0 ? (
            <p>Loading therapists...</p>
          ) : (
            <ul>
              {therapists.map((t) => (
                <li key={t.id}>
                  <strong>{t.name}</strong> – {t.specialization} (
                  {t.experienceYears} yrs)
                </li>
              ))}
            </ul>
          )}

          <h2 style={{ fontSize: 20, margin: "24px 0 8px" }}>
            Common questions
          </h2>
          {faqs.length === 0 ? (
            <p>Loading FAQs...</p>
          ) : (
            <ul>
              {faqs.map((f) => (
                <li key={f.id}>
                  <strong>{f.q}</strong> – {f.a}
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </main>
  );
}

function CategoryCard({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 16,
        padding: 24,
        minHeight: 190,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, opacity: 0.9 }}>{subtitle}</p>
      </div>
      <span style={{ fontSize: 24 }}>➜</span>
    </div>
  );
}
