
import { useId, useState } from "react";
import { SMART_PEOPLE } from "../data/smartPeople";
import styles from "./ScientistDirectory.module.css";

export function ScientistDirectory() {
  const searchId = useId();
  const iqId = useId();
  const sortId = useId();

  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(160);
  const [sortBy, setSortBy] = useState("iq-desc");

  const normalizedQuery = query.trim().toLowerCase();

  const visiblePeople = people
    .filter((person) =>
      person.name.toLowerCase().includes(normalizedQuery)
    )
    .filter((person) => person.iq >= minIq)
    .toSorted((a, b) => {
      if (sortBy === "iq-desc") {
        return b.iq - a.iq;
      }

      return a.age - b.age;
    });

  function handleIqChange(event) {
    const value = event.target.valueAsNumber;

    setMinIq(Number.isNaN(value) ? 0 : value);
  }

  return (
    <section
      className={styles.directory}
      aria-label="Pioneer Directory"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>KNOWLEDGE EXPLORER</p>
        <h2>Pioneer Directory</h2>
        <p>
          Explore scientists, inventors, and historical pioneers.
        </p>
      </header>

      <form
        className={styles.controls}
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={styles.field}>
          <label htmlFor={searchId}>Search name</label>
          <input
            id={searchId}
            type="search"
            value={query}
            placeholder="Einstein, Newton..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={iqId}>Minimum IQ</label>
          <input
            id={iqId}
            type="number"
            min="0"
            value={minIq}
            onChange={handleIqChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={sortId}>Sort by</label>
          <select
            id={sortId}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="iq-desc">IQ: highest first</option>
            <option value="age-asc">Age: youngest first</option>
          </select>
        </div>
      </form>

      <ul className={styles.peopleList}>
        {visiblePeople.map((person) => (
          <li key={person.id} className={styles.personCard}>
            <h3>{person.name}</h3>
            <p>Age: {person.age}</p>
            <p>IQ: {person.iq}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
