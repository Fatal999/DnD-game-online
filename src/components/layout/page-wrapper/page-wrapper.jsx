import { useState, useEffect } from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import GamesList from "../../blocks/games-list/games-list"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"
import Filter from "../../popups/filter/filter"
import UsersList from "../../blocks/user-list/user-list"
import UserMenu from "../../blocks/user-menu/user-menu"

export default function PageWrapper({cards, ...props}) {
  const [logInActive, setLogInActive] = useState(false);
  const [registrationActive, setRegistrationActive] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [logInDone, setlogIn] = useState(false);
  const [showLogInList, setShowLogInList] = useState(false);

  useEffect(() => {
    if (logInDone) {
      setShowLogInList(true);
    }
  }, [logInDone]);

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
      <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} logInDone={logInDone} setlogIn={setlogIn} />
      <main className="main">
        {showLogInList && (
            <UserMenu  />
          )}
        {showLogInList && (
            <UsersList  />
          )}
        <GamesList cards={cards}/>
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
      </main>
      <Footer />
    </>
  );
}
