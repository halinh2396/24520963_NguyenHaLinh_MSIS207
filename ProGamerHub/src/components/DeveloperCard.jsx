
import { Fragment, useState } from "react";
import styles from "./DeveloperCard.module.css";
import { SkillBadge } from "./SkillBadge";

const INITIAL_SKILLS = [
  { id: "sk-1", name: "React 19", tier: "Core" },
  { id: "sk-2", name: "JavaScript", tier: "Advanced" },
  { id: "sk-3", name: "CSS Modules", tier: "Core" },
];

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function DeveloperCard({
  fullName = "Nguyen Ha Linh",
  role = "Frontend Developer • ProGamer Hub",
  avatarUrl =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240",
  metrics = {
    commits: 512,
    vdomNodes: 0,
    a11yScore: 100,
  },
  skills = INITIAL_SKILLS,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getInitials(fullName) || "NA";

  return (
    <article
      className={styles.card}
      aria-labelledby="dev-heading"
    >
      <header className={styles.header}>
        {imageFailed ? (
          <span
            className={styles.avatarFallback}
            role="img"
            aria-label={`Avatar placeholder for ${fullName}`}
          >
            {initials}
          </span>
        ) : (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={`Portrait of ${fullName}`}
            width={64}
            height={64}
            onError={() => setImageFailed(true)}
          />
        )}

        <hgroup className={styles.identity}>
          <h2 id="dev-heading" className={styles.name}>
            {fullName}
          </h2>
          <p className={styles.role}>{role}</p>
        </hgroup>
      </header>

      <section
        className={styles.metricsSection}
        aria-label="Developer metrics"
      >
        <h3 className={styles.sectionTitle}>Performance</h3>

        <dl className={styles.metrics}>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section
        className={styles.skillsSection}
        aria-label="Developer skills"
      >
        <h3 className={styles.sectionTitle}>Engineered Skills</h3>

        <ul
          className={styles.skills}
          aria-label="Engineered Skills"
        >
          {skills.map((skill) => (
            <li key={skill.id} className={styles.skillItem}>
              <SkillBadge
                name={skill.name}
                tier={skill.tier}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
