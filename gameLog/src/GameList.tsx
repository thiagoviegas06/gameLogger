import React from "react";

interface GameListProps {
  GameList: string[];
}

function createGameTags(props: GameListProps) {
  return props.GameList.map((game, i) => (
    <li key={i}>{game}</li> 
  ));
}

// Component that uses the helper function
function GameList(props: GameListProps) {
  return (
    <div id="game-list">
      <ul>
        {createGameTags(props)} 
      </ul>
    </div>
  );
}

export default GameList;
