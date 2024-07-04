import Games from "../blocks/games-list"

function HomePage({cards}) {
  return (
    <>
     <Games cards={cards}/>
    </>
  )
}

export default HomePage;