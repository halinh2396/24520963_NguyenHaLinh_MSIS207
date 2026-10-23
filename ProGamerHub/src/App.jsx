
import { DeveloperCard } from "./components/DeveloperCard";
import "./App.css";

export default function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="eyebrow">PUBG VIETNAM ESPORTS</p>
        <h1>ProGamer Hub</h1>
        <p className="intro">
          Developer profile and engineering showcase.
        </p>
      </header>

      <section className="profile-section" aria-labelledby="profile-title">
        <h2 id="profile-title" className="page-section-title">
          Developer Profile
        </h2>

        <DeveloperCard />
      </section>

      <footer className="site-footer">
        <p>ProGamer Hub · Exercise 1</p>
      </footer>
    </main>
  );
}
