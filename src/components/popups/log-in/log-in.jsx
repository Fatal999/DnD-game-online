import { useState } from "react"
import ErrorRegistration from "../../popups/error-registration/error-registration"
import SuccessfulRegistration from "../successful-registration/succsessful-registration"
import Domain from "../../data/domain"

export default function LogInPopup({ onOverlayClick, onRegistrationClick, onForgotPasswordClick }) {
  const [isChecked, setIsChecked] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false
  })

  function handleChange(evt) {
    const { name, value, type, checked } = evt.target

    if (type === "checkbox") {
      setIsChecked(checked)
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const [errorData, setErrorData] = useState(null)

  const [goodLogIn, setGoodLogIn] = useState(false)

  function showGoodLogIn() {
    setGoodLogIn(true)
  }

  const [badLogIn, setBadLogIn] = useState(false)

  function showBadLogIn() {
    setBadLogIn(true)
  }

  const [passwordType, setPasswordType] = useState("password")

  function togglePasswordVisibility() {
    setPasswordType(passwordType === "password" ? "text" : "password")
  }

  async function handleClick(evt) {
    evt.preventDefault()

    try {
      const response = await fetch(`${Domain}api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Log In successful:", data)
        showGoodLogIn()
        localStorage.clear()
        localStorage.setItem("refresh", JSON.stringify(data.refresh))
        localStorage.setItem("access", JSON.stringify(data.access))
        window.location.reload()
      } else {
        console.error("Log In failed:", data)
        setErrorData(data.errors[0])
        showBadLogIn()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="main__log-in">
      <div className="main__log-in-overlay" onClick={onOverlayClick}></div>
      <div className="main__log-in-wrapper">
        <form className="main__log-in-form" onSubmit={handleClick}>
          <h1 className="main__log-in-title">Sign in</h1>
          <div className="main__log-in-container">
            <p className="main__log-in-member">Not a member yet?</p>
            <button className="main__log-in-button" type="button" onClick={onRegistrationClick}>
              Register now
            </button>
            <label className="main__log-in-email-label">Email address</label>
          </div>
          <input className="main__log-in-email" type="email" name="email" placeholder="Email" onChange={handleChange}></input>
          <div className="main__log-in-wrapp">
            <input
              className="main__log-in-passwod"
              type={passwordType}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            ></input>
            <button className="main__log-in-passwod-show" type="button" onClick={togglePasswordVisibility}></button>
          </div>
          {badLogIn && <ErrorRegistration error={errorData}></ErrorRegistration>}
          {goodLogIn && <SuccessfulRegistration></SuccessfulRegistration>}
          <button className="main__log-in-forgot-passwod" type="button" onClick={onForgotPasswordClick}>
            Forgot password?
          </button>
          <div className="main__log-in-check">
            <label className="main__log-in-label" htmlFor="log-in">
              <input
                className="main__log-in-checkbox"
                type="checkbox"
                id="log-in"
                name="remember_me"
                checked={isChecked}
                onChange={handleChange}
                value={isChecked}
              ></input>
              <span className="main__log-in-label-box"></span>
              Keep me logged in
            </label>
          </div>
          <button className="main__log-in-sign" type="submit">
            Sign in
          </button>
          <p className="main__log-in-choice">Or</p>
          <button className="main__log-in-google" type="button"></button>
        </form>
      </div>
    </div>
  )
}
