import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Path from "../../data/path"
import Domain from "../../data/domain"

export default function ProfilePopup({ onOverlayClick }) {
  const [data, setData] = useState(null)

  function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    window.location.reload()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
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
  }, [])

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
              <button type="button" onClick={handleLogout}>
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
