
import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../services/pubgTelemetryService';

const SQUADS = [
  { id: 'ces', name: 'Cerberus Esports' },
  { id: 'te', name: 'The Expendables' },
  { id: 'ge', name: 'Genius Esports' },
];

export function PubgMatchTelemetry({
  squadId = 'te',
  onSquadChange,
}) {
  const [view, setView] = useState({
    status: 'IDLE',
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    setView({
      status: 'LOADING',
      data: null,
      error: null,
    });

    fetchKraftonPubgTelemetry(squadId, {
      signal: controller.signal,
    })
      .then((payload) => {
        setView({
          status: 'SUCCESS',
          data: payload,
          error: null,
        });
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }

        setView({
          status: 'ERROR',
          data: null,
          error: err.message,
        });
      });

    return () => {
      controller.abort();
    };
  }, [squadId]);

  return (
    <section aria-labelledby="pubg-radar-title">
      <header>
        <h2 id="pubg-radar-title">PUBG Vietnam Live Radar</h2>
        <p>Simulated match telemetry</p>
      </header>

      <nav aria-label="Select PUBG squad">
        {SQUADS.map((squad) => (
          <button
            key={squad.id}
            type="button"
            onClick={() => onSquadChange?.(squad.id)}
            aria-pressed={squadId === squad.id}
          >
            {squad.name}
          </button>
        ))}
      </nav>

      {view.status === 'IDLE' && (
        <p>Telemetry is waiting to start.</p>
      )}

      {view.status === 'LOADING' && (
        <section aria-busy="true">
          <p>Syncing KRAFTON Radar...</p>
        </section>
      )}

      {view.status === 'ERROR' && (
        <section role="alert">
          <p>Blue-Zone Link Lost: {view.error}</p>
        </section>
      )}

      {view.status === 'SUCCESS' && view.data && (
        <article aria-live="polite">
          <h3>{view.data.name}</h3>
          <p>Map: {view.data.map}</p>
          <p>Phase: {view.data.phase}</p>
          <p>Players alive: {view.data.alive}</p>
          <p>Kills: {view.data.kills}</p>
          <p>WWCD probability: {view.data.wwcdProb}</p>
          <p>Team status: {view.data.status}</p>
        </article>
      )}
    </section>
  );
}
