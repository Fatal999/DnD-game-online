import { useState } from "react"

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

  async function handleClick(evt) {
    evt.preventDefault()

    try {
      const response = await fetch("https://dnd-game.ru/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Registration successful:", data)

        localStorage.clear()
        localStorage.setItem("refresh", JSON.stringify(data.refresh))
        localStorage.setItem("access", JSON.stringify(data.access))
      } else {
        console.error("Registration failed:", data)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="main__log-in">
      <div className="overlay" onClick={onOverlayClick}></div>
      <div className="main__log-in-wrapper">
        <form onSubmit={handleClick}>
          <h1 className="main__log-in-title">Sign in</h1>
          <div className="main__log-in-container">
            <p className="main__log-in-member">Not a member yet?</p>
            <button className="main__log-in-button" type="button" onClick={onRegistrationClick}>
              Register now
            </button>
            <label className="main__log-in-email-label">Email adress</label>
            <button className="main__log-in-passwod-show" type="button"></button>
          </div>
          <input className="main__log-in-email" type="email" name="email" placeholder="Email" onChange={handleChange}></input>
          <input className="main__log-in-passwod" type="password" name="password" placeholder="Password" onChange={handleChange}></input>
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
              <span class="main__log-in-label-box"></span>
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
