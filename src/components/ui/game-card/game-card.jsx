export default function GameCard({
  title,
  price,
  startDate,
  gameSystems,
  accessibility,
  seatsLeft,
  userName,
  pictures,
  userAvatar,
  domain
}) {
  return (
    <>
      <div className="main__games-images">
        {pictures.map((picture, id) => (
          <img key={id} className="main__games-image" src={`${domain}${picture.image}`} width="244" height="164" alt="Pic." />
        ))}
        <p className="main__games-price">{price}</p>
      </div>
      <div className="main__date">
        <label className="main__date-label">Start date:</label>
        <p className="main__date-main">{startDate}</p>
      </div>
      <p className="main__games-name">{title}</p>
      <p className="main__games-game">{gameSystems}</p>
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
        <p className="main__master-name" style={{ backgroundImage: `url(${domain}${userAvatar})` }}>
          {userName}
        </p>
      </div>
    </>
  )
}
