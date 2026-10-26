
import { DeveloperCard } from "./components/DeveloperCard";
import { ScientistDirectory } from "./components/ScientistDirectory";
import "./App.css";
import { useState } from "react";
import { PubgMatchTelemetry } from "./components/PubgMatchTelemetry";

export default function App() {
  const [selectedSquadId, setSelectedSquadId] = useState("te");

  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">PUBG VIETNAM ESPORTS</p>
        <h1>ProGamer Hub</h1>
        <p className="intro">
          Developer profile, pioneer directory, and esports intelligence.
        </p>
      </header>

      <section className="app-section" aria-labelledby="profile-title">
        <h2 id="profile-title">Developer Profile</h2>
        <DeveloperCard />
      </section>

      <section className="app-section" aria-labelledby="directory-title">
        <h2 id="directory-title" className="visually-hidden">
          Pioneer Directory
        </h2>
        <ScientistDirectory />
      </section>

      <section className="app-section" aria-labelledby="pubg-title">
        <h2 id="pubg-title">PUBG Live Radar</h2>
        <PubgMatchTelemetry
          squadId={selectedSquadId}
          onSquadChange={setSelectedSquadId}
        />
      </section>
    </main>
  );
}
