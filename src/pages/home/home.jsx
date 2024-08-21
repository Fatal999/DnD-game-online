import { useState } from "react"
import { Helmet } from "react-helmet-async"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import GamesList from "../../pages/home/components/games-list/games-list"
import GameFullScreen from "../../pages/home/components/game-full-screen/game-full-screen"

export default function Home({ cards, tokensPresent, ...props }) {
  const [gameFullScreen, setGameFullScreen] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState(null)

  function handleGameClick(gameId) {
    setSelectedGameId(gameId)
  }

  function openGameFullScreen() {
    setGameFullScreen(true)
  }

  function closeGameFullScreen() {
    setGameFullScreen(false)
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} gameFullScreen={gameFullScreen} />

      <Main>
        {gameFullScreen ? (
          <GameFullScreen closeGameFullScreen={closeGameFullScreen} selectedGameId={selectedGameId} tokensPresent={tokensPresent} />
        ) : (
          <>
            <GamesList cards={cards} openGameFullScreen={openGameFullScreen} tokensPresent={tokensPresent} onGameClick={handleGameClick} />
          </>
        )}
      </Main>
      <Footer />
    </>
  )
}
