import GamesList from "../blocks/games-list/games-list"

function HomePage({cards}) {
  return (
    <>
     <GamesList cards={cards}/>
    </>
  )
}

export default HomePage;