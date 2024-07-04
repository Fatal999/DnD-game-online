function RegistrationPopup() {
 return (
   <div className="main__registration-overlay">
     <div className="main__registration">
       <h1 className="main__registration-title">Get started absolutely free.</h1>
       <div className="main__registration-wrapp">
         <p className="main__registration-sign-in">Already have an account?</p>
         <button className="main__registration-account" type="button">Sign in</button>
       </div>
       <p className="main__registration-choose">Choose one option</p>
       <button className="main__registration-google" type="button"></button>
       <form>
         <p className="main__registration-choose">Or with your E-mail</p>
         <input className="main__registration-username" type="text" placeholder="Username"></input>
         <input className="main__registration-email" type="email" placeholder="Email address"></input>
         <input className="main__registration-password" type="password" placeholder="Password"></input>
         <button className="main__registration-password-show" type="button"></button>
         <input className="main__registration-password-repeat" type="password" placeholder="Repeat password"></input>
         <button className="main__registration-password-repeat-show" type="button"></button>
         <button className="main__registration-sign-up" type="submit">Sign up</button>
       </form>
     </div>
   </div>
 )
}

export default RegistrationPopup;
