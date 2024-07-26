import { useState } from "react"
import SuccessfulRegistration from "../../popups/successful-registration/succsessful-registration"
import ErrorRegistration from "../../popups/error-registration/error-registration"

function RegistrationPopup({ onOverlayClick, onLogInClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  })

  function handleChange(evt) {
    const { name, value } = evt.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const [goodRegistration, setGoodRegistration] = useState(false)

  function showGoodRegistration() {
    setGoodRegistration(true)
  }

  const [badRegistration, setBadRegistration] = useState(false)

  function showBadRegistration() {
    setBadRegistration(true)
  }

  const [errorData, setErrorData] = useState(null)

  const [passwordType, setPasswordType] = useState("password")
  const [passwordTypeRepeat, setPasswordTypeRepeat] = useState("password")

  function togglePasswordVisibility() {
    setPasswordType(passwordType === "password" ? "text" : "password")
  }

  function togglePasswordVisibilityRepeat() {
    setPasswordTypeRepeat(passwordTypeRepeat === "password" ? "text" : "password")
  }

  async function handleClick(evt) {
    evt.preventDefault()

    try {
      const response = await fetch("https://dnd-game.ru/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        showGoodRegistration()
        console.log("Registration successful:", data)
      } else {
        setErrorData(data.errors[0])
        showBadRegistration()
        console.error("Registration failed:", data)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="main__registration">
      <div className="overlay" onClick={onOverlayClick}></div>
      <div className="main__registration-wrapper">
        <h1 className="main__registration-title">Get started absolutely free.</h1>
        <div className="main__registration-container">
          <p className="main__registration-sign-in">Already have an account?</p>
          <button className="main__registration-account" type="button" onClick={onLogInClick}>
            Sign in
          </button>
        </div>
        <p className="main__registration-choose">Choose one option</p>
        <button className="main__registration-google" type="button"></button>
        <form className="main__registration-form" onSubmit={handleClick}>
          <p className="main__registration-choose">Or with your E-mail</p>
          {goodRegistration && <SuccessfulRegistration></SuccessfulRegistration>}
          {badRegistration && <ErrorRegistration error={errorData}></ErrorRegistration>}
          <input
            className="main__registration-username"
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></input>
          <input
            className="main__registration-email"
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></input>
          <div className="main__registration-wrapp">
            <input
              className="main__registration-password"
              type={passwordType}
              placeholder="Password"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
            ></input>
            <button className="main__registration-password-show" type="button" onClick={togglePasswordVisibility}></button>
          </div>
          <div className="main__registration-wrapp">
            <input
              className="main__registration-password-repeat"
              type={passwordTypeRepeat}
              placeholder="Repeat password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            ></input>
            <button className="main__registration-password-repeat-show" type="button" onClick={togglePasswordVisibilityRepeat}></button>
          </div>
          <button className="main__registration-sign-up" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistrationPopup
