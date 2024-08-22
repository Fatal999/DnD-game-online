import { useState } from "react"
import { useLocation } from "react-router-dom"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"
import Filter from "../../popups/filter/filter"
import ProfilePopup from "../../popups/profile-popup/profile-popup"
import GetUserData from "../../utils/get-user-data"

export default function Header({ tokensPresent, gameFullScreen }) {
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
  const [openProfileActive, setOpenProfile] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const location = useLocation() // Получаем текущий роут

  function showFilterHandler() {
    setFilterActive(true)
  }

  function closeProfile() {
    setOpenProfile(false)
  }

  function showLogInHandler() {
    setLogInActive(true)
  }

  function openProfile() {
    setOpenProfile(true)
  }

  function closeFilterHandler() {
    setFilterActive(false)
  }

  function refreshFilterHandler() {
    setFilterActive(false)
    setFilterActive(true)
  }

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

  const { data } = GetUserData()

  // Проверяем, находимся ли мы на странице Home
  const isHomeRoute = location.pathname === "/home" || location.pathname === "/"

  return (
    <nav className="header">
      <button className="header__eye" type="button"></button>
      <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
      {gameFullScreen || !isHomeRoute ? (
        <button className="header__filter" type="button" disabled></button> // Кнопка заблокирована на всех роутах кроме home
      ) : (
        <button className="header__filter" type="button" onClick={showFilterHandler}></button>
      )}
      <button className="header__search" type="button">
        Search
      </button>
      {tokensPresent ? (
        data ? (
          <button className="header__user-log-in" type="button" onClick={openProfile}>
            {data.username[0]}
          </button>
        ) : (
          <div>Loading...</div>
        )
      ) : (
        <button className="header__user" type="button" onClick={showLogInHandlerInternal}></button>
      )}
      {logInActive && (
        <LogInPopup
          onOverlayClick={closeLogInHandler}
          onRegistrationClick={showRegistrationHandler}
          onForgotPasswordClick={showForgotPasswordHandler}
        />
      )}
      {registrationActive && <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandlerInternal} />}
      {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />}
      {filterActive && (
        <Filter onOverlayClick={closeFilterHandler} onRefreshFilterClick={refreshFilterHandler} onCloseFilterClick={closeFilterHandler} />
      )}
      {tokensPresent && openProfileActive && <ProfilePopup onOverlayClick={closeProfile} />}
    </nav>
  )
}
