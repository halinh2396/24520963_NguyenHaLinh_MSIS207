
const TIER_LABELS = {
  Core: "Core",
  Advanced: "Advanced",
  Expert: "Expert",
};

export function SkillBadge({ name, tier = "Core" }) {
  const label = TIER_LABELS[tier] ?? tier;

  return (
    <span className="skill-badge">
      <span className="skill-badge__name">{name}</span>
      <span className="skill-badge__tier">{label}</span>
    </span>
  );
}
