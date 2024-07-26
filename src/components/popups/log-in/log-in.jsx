function LogInPopup({ onOverlayClick, onRegistrationClick, onForgotPasswordClick }) {
  return (
    <div className="main__log-in">
      <div className="overlay" onClick={onOverlayClick}></div>
      <div className="main__log-in-wrapper">
        <form action="https://echo.htmlacademy.ru/" method="get">
          <h1 className="main__log-in-title">Sign in</h1>
          <div className="main__log-in-container">
            <p className="main__log-in-member">Not a member yet?</p>
            <button className="main__log-in-button" type="button" onClick={onRegistrationClick}>
              Register now
            </button>
            <label className="main__log-in-email-label">Email adress</label>
            <button className="main__log-in-passwod-show" type="button"></button>
          </div>
          <input className="main__log-in-email" type="email" name="email" placeholder="Email"></input>
          <input className="main__log-in-passwod" type="password" name="password" placeholder="Password"></input>
          <button className="main__log-in-forgot-passwod" type="button" onClick={onForgotPasswordClick}>
            Forgot password?
          </button>
          <div className="main__log-in-check">
            <label className="main__log-in-label" htmlFor="log-in">
              <input className="main__log-in-checkbox" type="checkbox" id="log-in" name="log-in"></input>
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

export default LogInPopup
