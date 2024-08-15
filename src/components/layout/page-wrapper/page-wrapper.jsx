import { useState, useEffect } from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import GamesList from "../../blocks/games-list/games-list"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"
import Filter from "../../popups/filter/filter"
import GameFullScreen from "../../blocks/game-full-screen/game-full-screen"
import ProfilePopup from "../../popups/profile-popup/profile-popup"

export default function PageWrapper({cards, ...props}) {
  const [logInActive, setLogInActive] = useState(false);
  const [registrationActive, setRegistrationActive] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [logInDone, setlogIn] = useState(false);
  const [tokensPresent, setTokensPresent] = useState(false);
  const [gameFullScreen, setGameFullScreen] = useState(false);
  const [openProfileActive, setOpenProfile] = useState(false);
  const [selectedGameTitle, setSelectedGameTitle] = useState('');

  function openProfile() {
    setOpenProfile(true);
  }
  
  function closeProfile() {
    setOpenProfile(false);
  }

  function openGameFullScreen(title) {
    setSelectedGameTitle(title);
    setGameFullScreen(true); 
  }

  function closeGameFullScreen() {
    setGameFullScreen(false);
  }
  
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (accessToken && refreshToken) {
      setTokensPresent(true);
    } else {
      setTokensPresent(false);
    }
  }, []);

  function showLogInHandler() {
    setLogInActive(true);
    setRegistrationActive(false);
  }

  function closeLogInHandler() {
    setLogInActive(false);
  }

  function showRegistrationHandler() {
    setRegistrationActive(true);
    setLogInActive(false);
  }

  function closeRegistrationHandler() {
    setRegistrationActive(false);
  }

  function showForgotPasswordHandler() {
    setForgotPasswordActive(true);
    setLogInActive(false);
  }

  function closeForgotPasswordHandler() {
    setForgotPasswordActive(false);
  }

  function showFilterHandler() {
    setFilterActive(true);
  }

  function closeFilterHandler() {
    setFilterActive(false);
  }

  function refreshFilterHandler() {
    setFilterActive(false);
    setFilterActive(true);
  }

  return (
    <>
      {tokensPresent ? (
        <>
          <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} tokensPresent={tokensPresent} openProfile={openProfile}/>
          <main className="main">
          {openProfileActive && <ProfilePopup onOverlayClick={closeProfile}/>}
          {gameFullScreen ? (
            <GameFullScreen closeGameFullScreen={closeGameFullScreen} title={selectedGameTitle}/>
          ) : (
            <>
            <GamesList cards={cards} openGameFullScreen={openGameFullScreen} tokensPresent={tokensPresent}/>
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
      ) : (
        <>
        <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} />
        <main className="main">
          {gameFullScreen ? (
            <GameFullScreen closeGameFullScreen={closeGameFullScreen}/>
          ) : (
            <>
            <GamesList cards={cards} openGameFullScreen={openGameFullScreen} tokensPresent={tokensPresent}/>
            {logInActive && (
              <LogInPopup
                onOverlayClick={closeLogInHandler}
                onRegistrationClick={showRegistrationHandler}
                onForgotPasswordClick={showForgotPasswordHandler}
                logInDone={logInDone}
                setlogIn={setlogIn}
              />
            )}
            {registrationActive && (
              <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandler} />
            )}
            {forgotPasswordActive && (
              <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />
            )}
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
      )}
    </>
  );
}
