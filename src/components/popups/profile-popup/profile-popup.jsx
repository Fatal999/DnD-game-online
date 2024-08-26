import { useNavigate } from "react-router-dom"
import Path from "../../data/path"
import GetUserData from "../../../components/utils/get-user-data"
import HandleLogOut from "../../utils/handle-log-out"

export default function ProfilePopup({ onOverlayClick }) {
  const { data } = GetUserData()

  const navigate = useNavigate()

  function handleSettingsClick() {
    navigate(Path.Settings)
  }

  function handleHomeClick() {
    navigate(Path.Home)
  }

  function handleProfileClick() {
    navigate(Path.Profile)
  }

  function handleGamesClick() {
    navigate(Path.Games)
  }

  return (
    <div className="main__profile">
      <div className="overlay__profile" onClick={onOverlayClick}></div>
      {data ? (
        <div className="main__profile-wrapper">
          <h1>{data.username}</h1>
          <span>{data.email}</span>
          <ul>
            <li>
              <button type="button" onClick={handleHomeClick}>
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={handleProfileClick}>
                Profile
              </button>
            </li>
            <li>
              <button type="button" onClick={handleGamesClick}>
                Games
              </button>
            </li>
            <li>
              <button type="button" onClick={handleSettingsClick}>
                Settings
              </button>
            </li>
            <li>
              <button type="button" onClick={HandleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
