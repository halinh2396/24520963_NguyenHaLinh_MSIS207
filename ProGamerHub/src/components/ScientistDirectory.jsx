
import { SMART_PEOPLE } from "../data/smartPeople";

export function ScientistDirectory() {
  return (
    <section aria-label="Pioneer Directory">
      <header>
        <h2>Pioneer Directory</h2>
        <p>
          Explore scientists, inventors, and historical pioneers.
        </p>
      </header>

      <ul>
        {SMART_PEOPLE.map((person) => (
          <li key={person.id}>
            <h3>{person.name}</h3>
            <p>Age: {person.age}</p>
            <p>IQ: {person.iq}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
