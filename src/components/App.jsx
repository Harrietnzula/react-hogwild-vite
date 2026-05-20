import React, { useState } from "react";
import Nav from "./Nav";
import hogs from "../porkers_data";

function App() {
  const [hogList, setHogList] = useState(hogs);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [greased, setGreased] = useState(false);

  function handleHide(hogName) {
    setHogList(hogList.filter((h) => h.name !== hogName));
  }

  function handleAddHog(e) {
    e.preventDefault();
    const newHog = {
      name,
      weight: parseFloat(weight),
      specialty,
      greased,
      "highest medal achieved": "none",
      image: "https://placehold.co/200x200?text=Hog",
    };
    setHogList([...hogList, newHog]);
    setName("");
    setWeight("");
    setSpecialty("");
    setGreased(false);
  }

  let displayedHogs = greasedOnly ? hogList.filter((h) => h.greased) : hogList;

  if (sortBy === "name") {
    displayedHogs = [...displayedHogs].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "weight") {
    displayedHogs = [...displayedHogs].sort((a, b) => a.weight - b.weight);
  }

  return (
    <div className="App">
      <Nav />

      <div style={{ padding: "20px" }}>
        {/* Filter */}
        <label>
          Greased Pigs Only?
          <input
            type="checkbox"
            checked={greasedOnly}
            onChange={() => setGreasedOnly(!greasedOnly)}
          />
        </label>

        {/* Sort */}
        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </label>
      </div>

      {/* Hog Form */}
      <form onSubmit={handleAddHog} style={{ padding: "20px" }}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Weight:
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </label>
        <label>
          Specialty:
          <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
        </label>
        <label>
          Greased?
          <input type="checkbox" checked={greased} onChange={() => setGreased(!greased)} />
        </label>
        <button type="submit">Add Hog</button>
      </form>

      {/* Hog Grid */}
      <div className="ui grid container">
        {displayedHogs.map((hog) => (
          <HogCard key={hog.name} hog={hog} onHide={handleHide} />
        ))}
      </div>
    </div>
  );
}

function HogCard({ hog, onHide }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="ui eight wide column">
      <div
        className="ui card"
        aria-label="hog card"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="image">
          <img src={hog.image} alt={"Photo of " + hog.name} />
        </div>
        <div className="content">
          <h3 className="header">{hog.name}</h3>
          {showDetails && (
            <div className="description">
              <p>Specialty: {hog.specialty}</p>
              <p>{hog.weight}</p>
              <p>{hog.greased ? "Greased" : "Nongreased"}</p>
              <p>{hog["highest medal achieved"]}</p>
            </div>
          )}
        </div>
        <div className="extra content">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHide(hog.name);
            }}
          >
            Hide Me
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;