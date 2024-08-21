import Path from "../../components/data/path"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  function handleSettingsClick() {
    navigate(Path.Home)
  }

  return (
    <>
      <div className="page__login-container container">
        <section className="not-found">
          <h1 className="not-found__title">Whoops!</h1>
          <p className="not-found__text">Page Not Found :(</p>
          <button type="button" onClick={handleSettingsClick}>
            Back to Home
          </button>
        </section>
      </div>
    </>
  )
}
