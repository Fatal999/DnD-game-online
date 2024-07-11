function LogInPopup() {
 return (
   <div className="main__log-in">
     <div className="main__log-in-wrapper">
       <h1 className="main__log-in-title">Sign in</h1>
       <div className="main__log-in-container">
         <p className="main__log-in-member">Not a member yet?</p>
         <button className="main__log-in-button" type="button">Register now</button>
         <label className="main__log-in-email-label">Email adress</label>
         <button className="main__log-in-passwod-show" type="button"></button>
       </div>
       <input className="main__log-in-email" type="email" placeholder="Email"></input>
       <input className="main__log-in-passwod" type="password" placeholder="Password"></input>
       <button className="main__log-in-forgot-passwod" type="button">Forgot password?</button>
       <div className="main__log-in-check">
         <input className="main__log-in-checkbox" type="checkbox" id="log-in"></input>
         <label className="main__log-in-label" htmlFor="log-in">Keep me logged in</label>
       </div>
       <button className="main__log-in-sign" type="submit">Sign in</button>
       <p className="main__log-in-choice">Or</p>
       <button className="main__log-in-google" type="button"></button>
     </div>
   </div>
 )
}

export default LogInPopup;
