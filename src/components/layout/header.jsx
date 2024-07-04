function Header() {
 return (
   <nav className="header__navigation">
     <button className="header__eye" type="button"></button>
     <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
     <button className="header__filter" type="button"></button>
     <button className="header__search" type="button">Search</button>
     <button className="header__user" type="button"></button>
   </nav>
 )
}

export default Header;