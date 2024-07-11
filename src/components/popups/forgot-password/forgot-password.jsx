function ForgotPassword() {
 return (
   <div className="main__forgot-password">
     <div className="main__forgot-password-wrapper">
       <h1 className="main__forgot-password-title">Enter your email</h1>
       <input className="main__forgot-password-email" type="email" placeholder="Email"></input>
       <p className="main__forgot-password-description">We will send you a password recovery link.</p>
       <button className="main__forgot-password-submit" type="submit">Send link</button>
     </div>
   </div>
 );
}

export default ForgotPassword;
