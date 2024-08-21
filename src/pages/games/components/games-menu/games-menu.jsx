export default function GamesMenu() {
  return (
    <div className="main__games-menu">
      <button className="main__games-menu-toggler main__games-menu-toggler--active" type="button">
        Created
      </button>
      <button className="main__games-menu-toggler main__games-menu-toggler--disabled" type="button">
        Saved
      </button>
    </div>
  )
}
