"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Therapist = {
  id: string | number;
  name: string;
  specialization: string;
  experienceYears: number;
};

type FAQ = {
  id: string | number;
  q: string;
  a: string;
};

export default function Home() {
  const router = useRouter();

  const [apiStatus, setApiStatus] = useState("Checking...");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetch("https://ei-backend-04up.onrender.com/")
      .then((res) => res.text())
      .then((text) => setApiStatus(text))
      .catch(() => setApiStatus("Cannot reach backend"));
  }, []);

  useEffect(() => {
    fetch("https://ei-backend-04up.onrender.com/therapists")
      .then((res) => res.json())
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
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/faq" style={{ color: "white", textDecoration: "none" }}>
            FAQ
          </Link>
          <Link
            href="/therapists"
            style={{ color: "white", textDecoration: "none" }}
          >
            Therapists
          </Link>
          <Link
            href="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Contact
          </Link>
          <Link href="/login">
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
          </Link>
          <Link href="/signup">
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
          </Link>
        </nav>
      </header>

      {/* Hero + three cards */}
      <section
        style={{
          padding: "80px 24px",
          maxWidth: 1050,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 40, marginBottom: 12 }}>
          You deserve to feel better.
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "rgba(249,250,251,0.9)",
            marginBottom: 48,
          }}
        >
          What type of support are you looking for today?
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {/* Individual */}
          <button
            onClick={() => router.push("/login")}
            style={{
              border: "none",
              borderRadius: 24,
              padding: 32,
              textAlign: "left",
              cursor: "pointer",
              background: "#E6E1F5", // soft lavender
              color: "#111827",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.35)",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Individual
            </div>
            <div style={{ fontSize: 14, color: "#4B5563" }}>For myself</div>
          </button>

          {/* Couples */}
          <button
            onClick={() => router.push("/login")}
            style={{
              border: "none",
              borderRadius: 24,
              padding: 32,
              textAlign: "left",
              cursor: "pointer",
              background: "#D6D3D1", // warm grey
              color: "#111827",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.35)",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Couples
            </div>
            <div style={{ fontSize: 14, color: "#4B5563" }}>
              For me and my partner
            </div>
          </button>

          {/* Teen */}
          <button
            onClick={() => router.push("/login")}
            style={{
              border: "none",
              borderRadius: 24,
              padding: 32,
              textAlign: "left",
              cursor: "pointer",
              background: "#E9D5FF", // lavender variant
              color: "#111827",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.35)",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Teen
            </div>
            <div style={{ fontSize: 14, color: "#4B5563" }}>For my child</div>
          </button>
        </div>
      </section>
    </main>
  );
}
