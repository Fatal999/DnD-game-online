import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

export default function ProfileEdit({ tokensPresent }) {
  const navigate = useNavigate()

  function handleProfileClick() {
    navigate(Path.Profile)
  }
  return (
    <>
      <Helmet>
        <title>Profile Edit</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <button type="button" style={{ width: "100px" }} onClick={handleProfileClick}>
          &#8249; Profile
        </button>
        <form>
          <div>
            <h1>About</h1>
            <p>Tell the other players a little bit about yourself</p>
          </div>
          <div>
            <h2>Display Name</h2>
            <input type="text" placeholder="Ex: Konstantin Zhurakovskiy"></input>
            <h2>About</h2>
            <input type="text" placeholder="Describe yourself as a master..."></input>
          </div>
          <div>
            <h1>Game Experience</h1>
            <p>Describe your experience playing tabletop role-playing games</p>
          </div>
          <div>
            <h2>Game Systems</h2>
            <input type="text" placeholder="Soma"></input>
            <div>
              <div>
                <label>Dungeons & Dragons (5th Edition)</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Dread</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Fobos</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Warhammer 40K</label>
                <button type="button">X</button>
              </div>
            </div>
          </div>
          <div>
            <h2>Genres & Settings</h2>
            <input type="text" placeholder="Type here"></input>
            <div>
              <div>
                <label>Dungeons & Dragons (5th Edition)</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Dread</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Fobos</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Warhammer 40K</label>
                <button type="button">X</button>
              </div>
            </div>
          </div>
          <div>
            <h2>Сonventions</h2>
            <input type="text" placeholder="Type here"></input>
            <div>
              <div>
                <label>Dungeons & Dragons (5th Edition)</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Dread</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Fobos</label>
                <button type="button">X</button>
              </div>
              <div>
                <label>Warhammer 40K</label>
                <button type="button">X</button>
              </div>
            </div>
          </div>
          <div>
            <h1>Contacts</h1>
            <p>You can provide your contacts where you can be reached.</p>
          </div>
          <div>
            <h2>Links</h2>
            <div>
              <input type="text" placeholder="Name"></input>
              <input type="text" placeholder="Link"></input>
            </div>
            <button type="button">+ Add more</button>
            <label htmlFor="contacts">
              <input type="checkbox" id="contacts" name="contacts" value="contacts"></input>
              <span></span>
              Display your contacts
            </label>
            <button type="submit">Save</button>
          </div>
        </form>
        <CreateGameButton />
      </Main>
      <Footer />
    </>
  )
}
