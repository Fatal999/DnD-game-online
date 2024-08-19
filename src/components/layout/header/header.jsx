import { useState } from "react"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"

export default function Header({ onLoginClick, onFilterClick, tokensPresent, openProfile, domain, showLogInHandler }) {
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)

  function showLogInHandlerInternal() {
    showLogInHandler()
    setLogInActive(true)
    setRegistrationActive(false)
  }

  function closeLogInHandler() {
    setLogInActive(false)
  }

  function showRegistrationHandler() {
    setRegistrationActive(true)
    setLogInActive(false)
  }

  function closeRegistrationHandler() {
    setRegistrationActive(false)
  }

  function showForgotPasswordHandler() {
    setForgotPasswordActive(true)
    setLogInActive(false)
  }

  function closeForgotPasswordHandler() {
    setForgotPasswordActive(false)
  }

  return (
    <nav className="header">
      <button className="header__eye" type="button"></button>
      <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
      <button className="header__filter" type="button" onClick={onFilterClick}></button>
      <button className="header__search" type="button">
        Search
      </button>
      {tokensPresent ? (
        <button className="header__user-log-in" type="button" onClick={openProfile}></button>
      ) : (
        <button className="header__user" type="button" onClick={showLogInHandlerInternal}></button>
      )}
      {logInActive && (
        <LogInPopup
          domain={domain}
          onOverlayClick={closeLogInHandler}
          onRegistrationClick={showRegistrationHandler}
          onForgotPasswordClick={showForgotPasswordHandler}
        />
      )}
      {registrationActive && (
        <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandlerInternal} domain={domain} />
      )}
      {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />}
    </nav>
  )
}
