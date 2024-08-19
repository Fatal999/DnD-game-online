import { useState, useEffect } from "react"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"

export default function GameFullScreen({ closeGameFullScreen, domain, selectedGameId, tokensPresent }) {
  const [data, setData] = useState(null)
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)

  function showLogInHandler() {
    setLogInActive(true)
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
  }

  useEffect(() => {
    if (tokensPresent) {
      async function fetchData() {
        let token = localStorage.getItem("access")

        let response = await fetch(`${domain}api/game/${selectedGameId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        let data = await response.json()

        if (response.ok) {
          setData(data)
          console.log("Yep with token:", data)
        } else {
          console.log("Nope with token:", data)
          if (response.status === 401) {
            const refreshToken = JSON.parse(localStorage.getItem("refresh"))

            const refreshResponse = await fetch(`${domain}api/token/refresh/`, {
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
              response = await fetch(`${domain}api/game/${selectedGameId}/`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
              })

              data = await response.json()

              if (response.ok) {
                setData(data)
                console.log("Yep after refresh:", data)
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
    } else {
      async function fetchData() {
        let response = await fetch(`${domain}api/game/${selectedGameId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })

        let data = await response.json()

        if (response.ok) {
          setData(data)
          console.log("Yep no token:", data)
        } else {
          console.log("Nope no token:", data)
        }
      }

      fetchData()
    }
  }, [domain, selectedGameId, tokensPresent])

  return (
    <>
      <div>
        <button type="button" onClick={closeGameFullScreen}>
          Close
        </button>
        <p>Games</p>
        {tokensPresent && <button type="button">Like</button>}
        <button type="button">Share</button>
      </div>
      {data ? (
        <div>
          <div>
            {data.images.map((picture, id) => (
              <img className="main__games-image" key={id} src={`${domain}${picture.image}`} width="244" height="164" alt="Pic." />
            ))}
          </div>
          <div>
            <h1>{data.title}</h1>
            <label>Seats left: {data.group_members.seats_left}</label>
            <label>{data.game_format}</label>
          </div>
          <div>
            <div>
              <h2>General</h2>
              <p>Game Systems</p>
              <span>{data.game_systems}</span>
              <p>Platform (VTT)</p>
              <span>{data.platform}</span>
              <p>Game Genres & Settings</p>
              <span>{data.genres_settings}</span>
              <h2>Description</h2>
              <p>{data.description}</p>
            </div>
            <div>
              <h2>Information</h2>
              <p>Accessibility</p>
              <span>{data.accessibility}</span>
              <p>Location</p>
              <span>{data.location}</span>
              <p>Game format</p>
              <span>{data.game_format}</span>
              <p>Start date</p>
              <span>{data.start_date}</span>
              <p>Language</p>
              <span>{data.language}</span>
              <p>Home rules</p>
              <span>{data.home_rules}</span>
              <button type="button">Read rules</button>
              {!tokensPresent && (
                <button type="button" onClick={showLogInHandler}>
                  Log In and Save
                </button>
              )}
              {tokensPresent && <button type="button">Save</button>}
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
            </div>
            <div>
              <h2>Master</h2>
              <p className="main__master-name" style={{ backgroundImage: `url(${domain}${data.user.avatar})` }}>
                {data.user.display_name}
              </p>
              <div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}
