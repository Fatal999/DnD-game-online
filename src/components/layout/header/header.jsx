import { useState, useEffect } from "react"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"
import Filter from "../../popups/filter/filter"
import ProfilePopup from "../../popups/profile-popup/profile-popup"
import Domain from "../../data/domain"

export default function Header({ tokensPresent, gameFullScreen }) {
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
  const [openProfileActive, setOpenProfile] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [data, setData] = useState(null)

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

  function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    window.location.reload()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    if (tokensPresent) {
      async function fetchData() {
        let token = localStorage.getItem("access")

        let response = await fetch(`${Domain}api/account/settings/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        let data = await response.json()

        if (response.ok) {
          setData(data)
          console.log("Yep:", data)
        } else {
          console.log("Nope:", data)
          if (response.status === 401) {
            const refreshToken = JSON.parse(localStorage.getItem("refresh"))

            const refreshResponse = await fetch(`${Domain}api/token/refresh/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ refresh: refreshToken })
            })

            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json()
              localStorage.setItem("access", refreshData.access)

              token = refreshData.access
              response = await fetch(`${Domain}api/account/settings/`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              })

              data = await response.json()

              if (response.ok) {
                console.log("Yep after refresh:", data)
                setData(data)
              } else {
                console.log("Nope after refresh:", data)
                handleLogout()
              }
            } else {
              handleLogout()
            }
          }
        }
      }

      fetchData()
    }
  }, [tokensPresent])

  return (
    <nav className="header">
      <button className="header__eye" type="button"></button>
      <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
      {gameFullScreen ? (
        <button className="header__filter" type="button"></button>
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
