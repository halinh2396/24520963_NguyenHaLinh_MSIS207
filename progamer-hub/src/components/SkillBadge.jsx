export function SkillBadge({ name, tier = 'Core' }) {
  return (
    <span className="skill-badge">
      {name} <span aria-label={`Tier ${tier}`}>{tier}</span>
    </span>
  );
}