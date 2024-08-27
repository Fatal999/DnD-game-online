import { useNavigate } from "react-router-dom"
import Path from "../../data/path"
import { useState, useEffect } from "react"
import Domain from "../../data/domain"
import HandleLogOut from "../../utils/handle-log-out"

export default function ProfilePopup({ onOverlayClick, tokensPresent }) {
  const [data, setData] = useState(null)

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
              response = await fetch(`${Domain}api/account/settings/`, {
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
                HandleLogOut()
              }
            } else {
              HandleLogOut()
            }
          }
        }
      }

      fetchData()
    }
  }, [tokensPresent])

  const navigate = useNavigate()

  function handleSettingsClick() {
    navigate(Path.Settings)
  }

  function handleHomeClick() {
    navigate(Path.Home)
  }

  function handleProfileClick() {
    navigate(Path.Profile)
  }

  function handleGamesClick() {
    navigate(Path.Games)
  }

  return (
    <div className="main__profile">
      <div className="overlay__profile" onClick={onOverlayClick}></div>
      {data ? (
        <div className="main__profile-wrapper">
          <h1>{data.username}</h1>
          <span>{data.email}</span>
          <ul>
            <li>
              <button type="button" onClick={handleHomeClick}>
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={handleProfileClick}>
                Profile
              </button>
            </li>
            <li>
              <button type="button" onClick={handleGamesClick}>
                Games
              </button>
            </li>
            <li>
              <button type="button" onClick={handleSettingsClick}>
                Settings
              </button>
            </li>
            <li>
              <button type="button" onClick={HandleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
