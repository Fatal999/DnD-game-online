import { useState, useEffect } from "react"
import GameCard from "../game-card/game-card"
import Domain from "../../../../components/data/domain"
import CreateGameButton from "../../../../components/ui/create-game-button/create-game-button"

export default function GamesList({ openGameFullScreen, tokensPresent, onGameClick }) {
  const [cards, setCards] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${Domain}api/game/all/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const cards = await response.json()

      if (response.ok) {
        setCards(cards)
      } else {
        console.log("Nope:", cards)
        return
      }
    }
    fetchData()
  }, [])

  function handleGameClick(gameId) {
    onGameClick(gameId)
    openGameFullScreen()
  }

  return (
    <div className="main__games">
      <div className="main__games-wrapper">
        <label className="main__games-title">Games</label>
        <p className="main__games-count">{cards && cards.games ? cards.games.length : "Loading..."}</p>
      </div>
      <ul className="main__games-list">
        {cards && cards.games ? (
          cards.games.map((game) => (
            <li className="main__games-item" key={game.id} onClick={() => handleGameClick(game.id)}>
              <GameCard
                title={game.title}
                description={game.description}
                startDate={game.start_date}
                price={game.price}
                gameSystems={game.game_systems}
                accessibility={game.accessibility}
                seatsLeft={game.group_members.seats_left}
                userName={game.user.display_name}
                userAvatar={game.user.avatar}
                pictures={game.images}
              />
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
      {tokensPresent ? <CreateGameButton /> : <></>}
    </div>
  )
}
