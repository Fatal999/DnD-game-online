import { useState, useEffect } from "react";
import GameCard from "../../ui/game-card/game-card";

export default function GamesList({ openGameFullScreen, tokensPresent }) {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://dnd-game.ru/api/game/all/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const cards = await response.json();

      if (response.ok) {
        setCards(cards);
      } else {
        console.log("Nope:", cards);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="main__games">
      <div className="main__games-wrapper"> 
        <label className="main__games-title">Games</label>
        <p className="main__games-count">{cards && cards.games ? cards.games.length : "Loading..."}</p>
      </div>
      <ul className="main__games-list">
        {cards && cards.games ? (
          cards.games.map((game) => (           
            <li
              className="main__games-item"
              key={game.id}
              onClick={() => openGameFullScreen(game.title)}
            >
              <GameCard
                title={game.title} 
                description={game.description} 
                startDate={game.start_date}
                price={game.price}
                gameSystems={game.game_systems}
                accessibility={game.accessibility}
                fromGroup={game.from_group}
                user={game.user.display_name}
                pictures={game.images}
              />
            </li>
          ))
        ) : (
          <p>Loading games...</p>
        )}
      </ul>
      {tokensPresent ? <button className="main__games-button" type="button">+</button> : <></>}
    </div>
  );
}