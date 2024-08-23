import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

export default function CreateGame({ tokensPresent }) {
  const navigate = useNavigate()

  function handleCreateGameClick() {
    navigate(Path.Home)
  }
  return (
    <>
      <Helmet>
        <title>Create Game</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <button type="button" style={{ width: "100px" }} onClick={handleCreateGameClick}>
          &#8249; Back
        </button>
        <button type="button" style={{ width: "100px" }}>
          Preview
        </button>
        <form>
          <div>
            <h1>About</h1>
            <p>Title, description, image.</p>
          </div>
          <div>
            <h2>Title</h2>
            <input type="text" placeholder="Ex: Adventure Seekers Expedition"></input>
            <h2>Description</h2>
            <input type="text" placeholder="Describe your adventure..."></input>
            <h2>Images</h2>
            <form>
              <input type="file"></input>
              <div>???</div>
              <div>
                <button type="button">Remove All</button>
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>
          <div>
            <h1>General</h1>
            <p>Game Systems, Platform (VTT), Genres & Settings.</p>
          </div>
          <div>
            <h2>Game Systems</h2>
            <input type="text" placeholder="Dungeons & Dragons (5th Edition)"></input>
            <div>
              <div>
                <h2>Platform (VTT)</h2>
                <input type="text" placeholder="Foundry"></input>
              </div>
              <div>
                <h2>Genres & Settings</h2>
                <input type="text" placeholder="Fantasy"></input>
              </div>
            </div>
          </div>
          <div>
            <h1>Information</h1>
            <p>Describe how the game will be played (online or offline). Specify the game format and schedule of the games.</p>
          </div>
          <div>
            <div>
              <h2>Accessibility</h2>
              <select>
                <option>Both</option>
              </select>
            </div>
            <div>
              <h2>Location</h2>
              <select>
                <option>London</option>
              </select>
            </div>
            <h2>Game format</h2>
            <select>
              <option>Short Adventure</option>
            </select>
            <h2>Start date</h2>
            <input type="date"></input>
            <h2>Language</h2>
            <select>
              <option> English</option>
              <option>Russian</option>
            </select>
            <h2>Includes</h2>
            <label htmlFor="rules">
              <input type="checkbox" id="rules" name="rules" value="rules"></input>
              <span></span>
              Home rules
            </label>
            <input type="text" placeholder="Describe your rules..."></input>
          </div>
          <div>
            <h1>Price</h1>
            <p>Specify the cost of your game</p>
          </div>
          <div>
            <h2>Price</h2>
            <label htmlFor="price">
              <input type="checkbox" id="price" name="price" value="price"></input>
              <span></span>
              Free
            </label>
            <input type="text" placeholder="35.34"></input>
          </div>
          <button type="submit" style={{ width: "100px" }}>
            Create Game
          </button>
        </form>
        <CreateGameButton />
      </Main>
      <Footer />
    </>
  )
}
