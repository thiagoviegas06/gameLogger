import React, { useState } from "react";
import "./AddForm.css";

interface GameData {
  gameName: string;
  funFactor: number;
  gameplay: number;
  graphics: number;
  story: number;
  difficulty: number;
  overall: number;
  replayability: number;
  notes: string;
}

interface StarRatingProps {
  label: string;
  name: keyof GameData;
  value: number;
  onChange: (name: keyof GameData, value: number) => void;
}

const StarRating = ({ label, name, value, onChange }: StarRatingProps) => {
    const [hover, setHover] = useState(0);
  
    return (
      <div className="star-rating-group">
        <label className="rating-label">{label}:</label>
        
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || value) ? "filled" : ""}`}
              onClick={() => onChange(name, star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}

      </div>
    );
  };
  

function AddForm() {
  const [gameData, setGameData] = useState<GameData>({
    gameName: "GTA V",
    funFactor: 0,
    gameplay: 0,
    graphics: 0,
    story: 0,
    difficulty: 0,
    overall: 0,
    replayability: 0,
    notes: "",
  });

  const handleScoreChange = (name: keyof GameData, value: number) => {
    setGameData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGameData((prev) => ({
      ...prev,
      [name]: name === "notes" ? value : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted game data:", gameData);
    // You can send gameData to an API or process it here
  };

  return (
    <div className="add-form-container">
      <h1 className="add-form-title">Add Game</h1>
      <form
        className="add-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>Game: </label>
        <input
          type="text"
          name="name"
          value={gameData.gameName}
          placeholder="What game are you playing?"
          onChange={handleInputChange}
        />
        <StarRating
          label="Fun Factor"
          name="funFactor"
          value={gameData.funFactor}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Gameplay"
          name="gameplay"
          value={gameData.gameplay}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Graphics"
          name="graphics"
          value={gameData.graphics}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Story"
          name="story"
          value={gameData.story}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Difficulty"
          name="difficulty"
          value={gameData.difficulty}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Overall"
          name="overall"
          value={gameData.overall}
          onChange={handleScoreChange}
        />
        <StarRating
          label="Replayability"
          name="replayability"
          value={gameData.replayability}
          onChange={handleScoreChange}
        />

        <label>Notes:</label>
        <input
          type="text"
          name="notes"
          value={gameData.notes}
          placeholder="Any additional notes?"
          onChange={handleInputChange}
        />
        <br />
        <button className="add-form-submit" type="submit">
          Submit
        </button>
        
        <button className="add-form-cancel" type="button">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddForm;
export type { GameData };