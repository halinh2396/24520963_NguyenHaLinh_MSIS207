
import { DeveloperCard } from "./components/DeveloperCard";
import { ScientistDirectory } from "./components/ScientistDirectory";
import "./App.css";

export default function App() {
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

      <footer className="site-footer">
        <p>ProGamer Hub · Exercise 1 &amp; Exercise 2</p>
      </footer>
    </main>
  );
}
