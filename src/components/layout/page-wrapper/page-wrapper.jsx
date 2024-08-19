import { useState, useEffect } from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import GamesList from "../../blocks/games-list/games-list"
import Filter from "../../popups/filter/filter"
import GameFullScreen from "../../blocks/game-full-screen/game-full-screen"
import ProfilePopup from "../../popups/profile-popup/profile-popup"

export default function PageWrapper({ cards, domain, ...props }) {
  const [filterActive, setFilterActive] = useState(false)
  const [tokensPresent, setTokensPresent] = useState(false)
  const [gameFullScreen, setGameFullScreen] = useState(false)
  const [openProfileActive, setOpenProfile] = useState(false)
  const [selectedGameId, setSelectedGameId] = useState(null)
  const [logInActive, setLogInActive] = useState(false)

  function handleGameClick(gameId) {
    setSelectedGameId(gameId)
  }

  function openProfile() {
    setOpenProfile(true)
  }

  function closeProfile() {
    setOpenProfile(false)
  }

  function openGameFullScreen() {
    setGameFullScreen(true)
  }

  function closeGameFullScreen() {
    setGameFullScreen(false)
  }

  function showLogInHandler() {
    setLogInActive(true)
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access")
    const refreshToken = localStorage.getItem("refresh")

    if (accessToken && refreshToken) {
      setTokensPresent(true)
    } else {
      setTokensPresent(false)
    }
  }, [])

  function showFilterHandler() {
    setFilterActive(true)
  }

  function closeFilterHandler() {
    setFilterActive(false)
  }

  function refreshFilterHandler() {
    setFilterActive(false)
    setFilterActive(true)
  }

  return (
    <>
      <Header
        onLoginClick={showLogInHandler}
        onFilterClick={showFilterHandler}
        tokensPresent={tokensPresent}
        openProfile={openProfile}
        domain={domain}
        showLogInHandler={showLogInHandler}
        logInActive={logInActive}
      />
      <main className="main">
        {tokensPresent && openProfileActive && <ProfilePopup onOverlayClick={closeProfile} domain={domain} />}
        {gameFullScreen ? (
          <GameFullScreen
            closeGameFullScreen={closeGameFullScreen}
            domain={domain}
            selectedGameId={selectedGameId}
            tokensPresent={tokensPresent}
            onOverlayClick={closeFilterHandler}
          />
        ) : (
          <>
            <GamesList
              cards={cards}
              openGameFullScreen={openGameFullScreen}
              tokensPresent={tokensPresent}
              domain={domain}
              onGameClick={handleGameClick}
            />
            {filterActive && (
              <Filter
                onOverlayClick={closeFilterHandler}
                onRefreshFilterClick={refreshFilterHandler}
                onCloseFilterClick={closeFilterHandler}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
