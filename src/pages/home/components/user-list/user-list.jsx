import UserImg from "../../../assets/user-img.png"
import UserAvatar from "../../../assets/un-log.svg"

export default function UsersList() {
  return (
    <div className="main__users">
      <div className="main__users-wrapper">
        <label className="main__users-label">Users</label>
        <p className="main__users-count">6</p>
      </div>
      <ul className="main__users-list">
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
        <li className="main__users-item">
          <img className="main__users-background" src={UserImg} width="328" height="164" alt="Background."></img>
          <img className="main__users-avatar" src={UserAvatar} width="60" height="60" alt="Avatar."></img>
          <p className="main__users-status">Forming a Group</p>
          <p className="main__users-name">Konstantine Zhurakovskiy</p>
          <p className="main__users-game">Dungeons & Dragons (5th Edition)</p>
          <p className="main__users-games">+2</p>
        </li>
      </ul>
    </div>
  )
}
