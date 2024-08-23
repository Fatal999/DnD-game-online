import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

export default function Profile({ tokensPresent }) {
  const navigate = useNavigate()

  function handleProfileEditClick() {
    navigate(Path.ProfileEdit)
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <div>
          <button type="button">Share</button>
          <button type="button" onClick={handleProfileEditClick}>
            Edit
          </button>
        </div>
        <div>
          <input type="file"></input>
        </div>
        <div>
          <h1>User</h1>
          <label>???</label>
        </div>
        <div>
          <h2>Games created</h2>
          <div>???</div>
        </div>
        <div>
          <h2>About</h2>
          <p>???</p>
        </div>
        <div>
          <h2>Game Experience</h2>
          <span>Game Systems</span>
          <div>???</div>
          <span>Genres & Settings</span>
          <div>???</div>
        </div>
        <div>
          <h2>Contacts</h2>
          <span>
            Discord<p>???</p>
          </span>
          <span>
            Telegram<p>???</p>
          </span>
        </div>
        <CreateGameButton />
      </Main>
      <Footer />
    </>
  )
}
