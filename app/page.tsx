"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [apiStatus, setApiStatus] = useState("Checking...");

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/`;
    fetch(url)
      .then((res) => res.text())
      .then((text) => setApiStatus(text))
      .catch(() => setApiStatus("Cannot reach backend"));
  }, []);

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1>EI_HealthCare</h1>
      <p>
        Online emotional and mental health support for individuals who want to
        talk to a professional from home.
      </p>

      <h2>What you get</h2>
      <ul>
        <li>1:1 online sessions with a therapist (video or audio).</li>
        <li>Private and secure conversations.</li>
        <li>Simple pricing and easy booking.</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        Booking and payment features are coming soon. For now, this website is
        under active development.
      </p>

      <h2>Backend status</h2>
      <p>{apiStatus}</p>
    </main>
  );
}
