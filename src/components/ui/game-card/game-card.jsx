export default function GameCard({pictures, price, startDate, game, gameSystem, accessibility, seatsLeft, masterAvatar, master}) {
 return (
  <>
  <div className="main__games-images">
    <img className="main__games-images-first" src={pictures[0]} width="244" height="164" alt="Main."></img>
    <img className="main__games-images-second" src={pictures[1]} width="80" height="80" alt="Add."></img>
    <img className="main__games-images-third" src={pictures[2]} width="80" height="80" alt="Add."></img>
    <p className="main__games-price">{price}</p>
  </div>
  <div className="main__date">
    <label className="main__date-label">Start date:</label>
    <p className="main__date-main">{startDate}</p>
  </div>
  <p className="main__games-name">{game}</p>
  <p className="main__games-game">{gameSystem}</p>
  <div className="main__accessibility">
    <label className="main__accessibility-label">Accessibility</label>
    <p className="main__accessibility-status">{accessibility}</p>
  </div>
    <div className="main__games-seats">
    <label className="main__games-label">Seats left:</label>
    <p className="main__games-status">{seatsLeft}</p>
  </div>
    <div className="main__master">
    <label className="main__master-label">Master:</label>
    <p className="main__master-name" style={{ backgroundImage: `url(${masterAvatar})` }}>{master}</p>
  </div>
  </>
 )
}
