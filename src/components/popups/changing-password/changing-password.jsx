import Domain from "../../data/domain"
import { useState } from "react"
import SuccessfulPopup from "../../popups/successful-popup/succsessful-popup"
import ErrorPopup from "../../popups/error-popup/error-popup"

export default function ChangingPassword({ onOverlayClick }) {
  const [errorData, setErrorData] = useState(null)
  const [formData, setFormData] = useState({
    password1: "",
    password2: ""
  })

  const [goodChangePassword, setGoodChangePassword] = useState(false)
  const [badChangePassword, setBadChangePassword] = useState(false)

  function showGoodChangePassword() {
    setGoodChangePassword(true)
  }

  function showBadChangePassword() {
    setBadChangePassword(true)
  }

  async function handleClick(evt) {
    evt.preventDefault()

    let token = localStorage.getItem("access")

    try {
      let response = await fetch(`${Domain}api/account/password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      let data = await response.json()

      if (response.ok) {
        console.error("PW changed:", data)
        showGoodChangePassword()
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        window.location.reload()
      } else {
        console.error("PW failed:", data)
        console.log(formData)

        setErrorData(data.errors[0])
        showBadChangePassword()

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
              setFormData(data)
            } else {
              console.log("Nope after refresh:", data)
              // handleLogout()
            }
          } else {
            // handleLogout()
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="main__changing-password">
      <div className="main__changing-password-overlay" onClick={onOverlayClick}></div>
      <div className="main__changing-password-wrapper">
        <form onSubmit={handleClick}>
          <h1 className="main__changing-password-title">Change password</h1>
          <input
            className="main__changing-password-password"
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password1: e.target.value })}
          ></input>
          <input
            className="main__changing-password-password"
            type="password"
            placeholder="Repeat Password"
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
          ></input>
          {badChangePassword && <ErrorPopup error={errorData}></ErrorPopup>}
          {goodChangePassword && <SuccessfulPopup></SuccessfulPopup>}
          <button className="main__changing-password-submit" type="submit">
            Change
          </button>
        </form>
      </div>
    </div>
  )
}
