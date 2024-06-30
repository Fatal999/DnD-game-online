function ChangingPassword() {
 return (
   <div className="main__changing-password-overlay">
     <div className="main__changing-password">
       <h1 className="main__changing-password-title">Change password</h1>
       <input className="main__changing-password-password" type="password" placeholder="Password"></input>
       <input className="main__changing-password-password" type="password" placeholder="Repeat Password"></input>
       <button className="main__changing-password-submit" type="submit">Change</button>
     </div>
   </div>
 );
}

export default ChangingPassword;