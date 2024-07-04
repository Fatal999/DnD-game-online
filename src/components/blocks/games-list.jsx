import GameCard from "../ui/game-card"

function Games({cards}) {
 if (cards.length === 0) {
  return null;
 } else {
  return (
    <div className="main__games">
    <div className="main__games-counter">
      <label className="main__games-title">Games</label>
      <p className="main__games-count">{cards.length}</p>
    </div>
    <ul className="main__games-list">
    {cards.map((card) => (
        <li key={card.id}>
          <GameCard {...card} />
        </li>
    ))}
    </ul>
    <button className="main__games-button" type="button">+</button>
    </div>
  )
 }
}

export default Games;
