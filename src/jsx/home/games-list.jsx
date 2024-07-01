function Games({cardData}) {
 return (
   <div className="main__games">
     <div className="main__games-counter">
       <label className="main__games-title">Games</label>
       <p className="main__games-count">5</p>
     </div>
     <ul className="main__games-list">
       <li className="main__games-item">
         <div className="main__games-images">
           <img className="main__games-main" src={cardData.pictures[0]} width="244" height="164" alt="Main."></img>
           <img className="main__games-add" src={cardData.pictures[1]} width="80" height="80" alt="Add."></img>
           <img className="main__games-add-1" src={cardData.pictures[2]} width="80" height="80" alt="Add."></img>
           <p className="main__games-price">{cardData.price}</p>
         </div>
         <div className="main__date">
           <label className="main__date-label">Start date:</label>
           <p className="main__date-main">{cardData.startDate}</p>
         </div>
         <p className="main__games-name">{cardData.game}</p>
         <p className="main__games-game">{cardData.gameSystem}</p>
         <div className="main__accessibility">
           <label className="main__accessibility-label">Accessibility</label>
           <p className="main__accessibility-status">{cardData.accessibility}</p>
         </div>
           <div className="main__games-seats">
           <label className="main__games-label">Seats left:</label>
           <p className="main__games-status">{cardData.seatsLeft}</p>
         </div>
           <div className="main__master">
           <label className="main__master-label">Master:</label>
           <p className="main__master-name" style={{ backgroundImage: `url(${cardData.masterAvatar})` }}>{cardData.master}</p>
         </div>
       </li>
       <li className="main__games-item">
         <div className="main__games-images">
           <img className="main__games-main" src={cardData.pictures[0]} width="244" height="164" alt="Main."></img>
           <img className="main__games-add" src={cardData.pictures[1]} width="80" height="80" alt="Add."></img>
           <img className="main__games-add-1" src={cardData.pictures[2]} width="80" height="80" alt="Add."></img>
           <p className="main__games-price">{cardData.price}</p>
         </div>
         <div className="main__date">
           <label className="main__date-label">Start date:</label>
           <p className="main__date-main">{cardData.startDate}</p>
         </div>
         <p className="main__games-name">{cardData.game}</p>
         <p className="main__games-game">{cardData.gameSystem}</p>
         <div className="main__accessibility">
           <label className="main__accessibility-label">Accessibility</label>
           <p className="main__accessibility-status">{cardData.accessibility}</p>
         </div>
           <div className="main__games-seats">
           <label className="main__games-label">Seats left:</label>
           <p className="main__games-status">{cardData.seatsLeft}</p>
         </div>
           <div className="main__master">
           <label className="main__master-label">Master:</label>
           <p className="main__master-name" style={{ backgroundImage: `url(${cardData.masterAvatar})` }}>{cardData.master}</p>
         </div>
       </li>
       <li className="main__games-item">
         <div className="main__games-images">
           <img className="main__games-main" src={cardData.pictures[0]} width="244" height="164" alt="Main."></img>
           <img className="main__games-add" src={cardData.pictures[1]} width="80" height="80" alt="Add."></img>
           <img className="main__games-add-1" src={cardData.pictures[2]} width="80" height="80" alt="Add."></img>
           <p className="main__games-price">{cardData.price}</p>
         </div>
         <div className="main__date">
           <label className="main__date-label">Start date:</label>
           <p className="main__date-main">{cardData.startDate}</p>
         </div>
         <p className="main__games-name">{cardData.game}</p>
         <p className="main__games-game">{cardData.gameSystem}</p>
         <div className="main__accessibility">
           <label className="main__accessibility-label">Accessibility</label>
           <p className="main__accessibility-status">{cardData.accessibility}</p>
         </div>
           <div className="main__games-seats">
           <label className="main__games-label">Seats left:</label>
           <p className="main__games-status">{cardData.seatsLeft}</p>
         </div>
           <div className="main__master">
           <label className="main__master-label">Master:</label>
           <p className="main__master-name" style={{ backgroundImage: `url(${cardData.masterAvatar})` }}>{cardData.master}</p>
         </div>
       </li>
       <li className="main__games-item">
         <div className="main__games-images">
           <img className="main__games-main" src={cardData.pictures[0]} width="244" height="164" alt="Main."></img>
           <img className="main__games-add" src={cardData.pictures[1]} width="80" height="80" alt="Add."></img>
           <img className="main__games-add-1" src={cardData.pictures[2]} width="80" height="80" alt="Add."></img>
           <p className="main__games-price">{cardData.price}</p>
         </div>
         <div className="main__date">
           <label className="main__date-label">Start date:</label>
           <p className="main__date-main">{cardData.startDate}</p>
         </div>
         <p className="main__games-name">{cardData.game}</p>
         <p className="main__games-game">{cardData.gameSystem}</p>
         <div className="main__accessibility">
           <label className="main__accessibility-label">Accessibility</label>
           <p className="main__accessibility-status">{cardData.accessibility}</p>
         </div>
           <div className="main__games-seats">
           <label className="main__games-label">Seats left:</label>
           <p className="main__games-status">{cardData.seatsLeft}</p>
         </div>
           <div className="main__master">
           <label className="main__master-label">Master:</label>
           <p className="main__master-name" style={{ backgroundImage: `url(${cardData.masterAvatar})` }}>{cardData.master}</p>
         </div>
       </li>
              <li className="main__games-item">
         <div className="main__games-images">
           <img className="main__games-main" src={cardData.pictures[0]} width="244" height="164" alt="Main."></img>
           <img className="main__games-add" src={cardData.pictures[1]} width="80" height="80" alt="Add."></img>
           <img className="main__games-add-1" src={cardData.pictures[2]} width="80" height="80" alt="Add."></img>
           <p className="main__games-price">{cardData.price}</p>
         </div>
         <div className="main__date">
           <label className="main__date-label">Start date:</label>
           <p className="main__date-main">{cardData.startDate}</p>
         </div>
         <p className="main__games-name">{cardData.game}</p>
         <p className="main__games-game">{cardData.gameSystem}</p>
         <div className="main__accessibility">
           <label className="main__accessibility-label">Accessibility</label>
           <p className="main__accessibility-status">{cardData.accessibility}</p>
         </div>
           <div className="main__games-seats">
           <label className="main__games-label">Seats left:</label>
           <p className="main__games-status">{cardData.seatsLeft}</p>
         </div>
           <div className="main__master">
           <label className="main__master-label">Master:</label>
           <p className="main__master-name" style={{ backgroundImage: `url(${cardData.masterAvatar})` }}>{cardData.master}</p>
         </div>
       </li>
     </ul>
     <button className="main__games-button" type="button">+</button>
   </div>
 )
}

export default Games;
