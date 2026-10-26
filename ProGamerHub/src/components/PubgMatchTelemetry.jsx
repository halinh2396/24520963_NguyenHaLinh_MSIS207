
import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../services/pubgTelemetryService';
import styles from './PubgMatchTelemetry.module.css';

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

  const [retryTick, setRetryTick] = useState(0);

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
          error: err.message || 'Unknown telemetry error.',
        });
      });

    return () => {
      controller.abort();
    };
  }, [squadId, retryTick]);

  return (
    <section
      className={styles.radar}
      aria-labelledby="pubg-radar-title"
    >
      <header className={styles.header}>
        <h2 id="pubg-radar-title">
          PUBG Vietnam Live Radar
        </h2>
        <p>
          KRAFTON satellite telemetry simulation
        </p>
      </header>

      <nav
        className={styles.squadSelector}
        aria-label="Select PUBG squad"
      >
        {SQUADS.map((squad) => (
          <button
            className={styles.squadButton}
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
        <section className={styles.panel}>
          <p className={styles.muted}>
            Telemetry is waiting to start.
          </p>
        </section>
      )}

      {view.status === 'LOADING' && (
        <section
          className={styles.skeleton}
          aria-busy="true"
          aria-label="Loading match telemetry"
        >
          <div className={styles.skeletonInner}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLine} />
          </div>
          <p className={styles.srOnly}>
            Syncing KRAFTON Radar...
          </p>
        </section>
      )}

      {view.status === 'ERROR' && (
        <section
          className={`${styles.panel} ${styles.error}`}
          role="alert"
        >
          <h3>Blue-Zone Link Lost</h3>
          <p>{view.error}</p>
          <p className={styles.muted}>
            The simulated satellite connection failed.
            Please reconnect and try again.
          </p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={() => {
              setRetryTick((tick) => tick + 1);
            }}
          >
            Reconnect Satellite (Retry)
          </button>
        </section>
      )}

      {view.status === 'SUCCESS' && view.data && (
        <article
          className={styles.panel}
          aria-live="polite"
          aria-labelledby="squad-result-title"
        >
          <h3 id="squad-result-title">
            {view.data.name}
          </h3>
          <p className={styles.muted}>
            {view.data.map} · {view.data.phase}
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>Players Alive</dt>
              <dd>{view.data.alive}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Total Kills</dt>
              <dd>{view.data.kills}</dd>
            </div>
            <div className={styles.stat}>
              <dt>WWCD Probability</dt>
              <dd>{view.data.wwcdProb}</dd>
            </div>
          </dl>

          <p>
            <strong>Team status:</strong>{' '}
            {view.data.status}
          </p>
        </article>
      )}
    </section>
  );
}
