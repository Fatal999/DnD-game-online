import { useState } from "react";
import LogInPopup from "../../popups/log-in/log-in";
 
function Header() {
const [logInActive, setLogInActive] = useState(false);

 return (
  <nav className="header">
   <button className="header__eye" type="button"></button>
   <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
   <button className="header__filter" type="button"></button>
   <button className="header__search" type="button">Search</button>
   <button className="header__user" type="button" onClick={() => {setLogInActive(true)}}></button>
   <LogInPopup active={logInActive} setActive={setLogInActive}></LogInPopup>
  </nav> 
 )
}

export default Header; 