import { Fragment, useState } from 'react';
import styles from './DeveloperCard.module.css';
import { SkillBadge } from './SkillBadge.jsx';

export function DeveloperCard({
  fullName = 'ProGamer Hub Developer',
  role = 'Frontend Engineer',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240',
  metrics = {
    commits: 512,
    vdomNodes: 0,
    a11yScore: 100,
  },
  skills = [
    { id: 'sk-1', name: 'React', tier: 'Core' },
    { id: 'sk-2', name: 'JavaScript', tier: 'Core' },
    { id: 'sk-3', name: 'Accessibility', tier: 'Advanced' },
  ],
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className={styles.card}
      aria-labelledby="dev-heading"
    >
      <header className={styles.header}>
        {imageFailed ? (
          <span className={styles.avatarFallback} aria-hidden="true">
            {fullName
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </span>
        ) : (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={`Avatar of ${fullName}`}
            width="64"
            height="64"
            onError={() => setImageFailed(true)}
          />
        )}

        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <section aria-labelledby="skills-heading">
        <h3 id="skills-heading">Engineered Skills</h3>
        <ul className={styles.skills} aria-label="Engineered Skills">
          {skills.map((skill) => (
            <li key={skill.id}>
              <SkillBadge name={skill.name} tier={skill.tier} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}