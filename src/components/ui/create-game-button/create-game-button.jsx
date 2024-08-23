import { useNavigate } from "react-router-dom"
import Path from "../../data/path"

export default function CreateGameButton() {
  const navigate = useNavigate()

  function handleCreateGameClick() {
    navigate(Path.CreateGame)
  }

  return (
    <button className="main__create-game-button" type="button" onClick={handleCreateGameClick}>
      +
    </button>
  )
}
