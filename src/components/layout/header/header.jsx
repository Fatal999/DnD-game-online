export default function Header({ onLoginClick, onFilterClick, tokensPresent, openProfile }) {
  return (
    <nav className="header">
      <button className="header__eye" type="button"></button>
      <input className="header__input" type="text" placeholder="Search for parties, masters & players" action="#" method="submit"></input>
      <button className="header__filter" type="button" onClick={onFilterClick}></button>
      <button className="header__search" type="button">
        Search
      </button>
      {tokensPresent ? (
        <button className="header__user-log-in" type="button" onClick={openProfile}></button>
      ) : (
        <button className="header__user" type="button" onClick={onLoginClick}></button>
      )}
    </nav> 
  )
}
