import { useState, useEffect } from "react"
import RegistrationPopup from "../../../../components/popups/registration/registration"
import LogInPopup from "../../../../components/popups/log-in/log-in"
import ForgotPassword from "../../../../components/popups/forgot-password/forgot-password"
import Domain from "../../../../components/data/domain"

export default function GameFullScreen({ closeGameFullScreen, selectedGameId, tokensPresent }) {
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    if (tokensPresent) {
      async function fetchData() {
        let token = localStorage.getItem("access")

        let response = await fetch(`${Domain}api/game/${selectedGameId}/`, {
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
              response = await fetch(`${Domain}api/game/${selectedGameId}/`, {
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
        let response = await fetch(`${Domain}api/game/${selectedGameId}/`, {
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
  }, [selectedGameId, tokensPresent])

  return (
    <>
      <div>
        <button type="button" onClick={closeGameFullScreen}>
          &#8249; Games
        </button>
        {tokensPresent && <button type="button">Like</button>}
        <button type="button">Share</button>
      </div>
      {data ? (
        <div>
          <div>
            {data.images.map((picture, id) => (
              <img className="main__games-image" key={id} src={`${Domain}${picture.image}`} width="244" height="164" alt="Pic." />
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
              <h3>Game Systems</h3>
              <span>{data.game_systems}</span>
              <h3>Platform (VTT)</h3>
              <span>{data.platform}</span>
              <h3>Game Genres & Settings</h3>
              <span>{data.genres_settings}</span>
              <h2>Description</h2>
              <p>{data.description}</p>
            </div>
            <div>
              <h2>Information</h2>
              <h3>Accessibility</h3>
              <span>{data.accessibility}</span>
              <h3>Location</h3>
              <span>{data.location}</span>
              <h3>Game format</h3>
              <span>{data.game_format}</span>
              <h3>Start date</h3>
              <span>{data.start_date}</span>
              <h3>Language</h3>
              <span>{data.language}</span>
              <h3>Home rules</h3>
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
                  onOverlayClick={closeLogInHandler}
                  onRegistrationClick={showRegistrationHandler}
                  onForgotPasswordClick={showForgotPasswordHandler}
                />
              )}
              {registrationActive && (
                <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandlerInternal} />
              )}
              {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />}
            </div>
            <div>
              <h2>Master</h2>
              <p className="main__master-name" style={{ backgroundImage: `url(${Domain}${data.user.avatar})` }}>
                {data.user.display_name}
              </p>
              <div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
