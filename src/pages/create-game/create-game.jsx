import { useState } from "react"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import HandleLogOut from "../../components/utils/handle-log-out"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import Domain from "../../components/data/domain"

export default function CreateGame({ tokensPresent }) {
  const navigate = useNavigate()

  function handleCreateGameClick() {
    navigate(Path.Home)
  }

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState("")
  const [genresSettings, setGenresSettings] = useState("")
  const [gameSystems, setGameSystems] = useState("")
  const [location, setLocation] = useState("")
  const [accessibility, setAccessibility] = useState("")
  const [gameFormat, setGameFormat] = useState("")
  const [startDate, setStartDate] = useState("")
  const [language, setLanguage] = useState("")
  const [homeRules, setHomeRules] = useState("")
  // const [address, setAddress] = useState("")
  const [images, setImages] = useState([])
  const [price, setPrice] = useState("")
  const [freePrice, setFreePrice] = useState(false)
  const [homeRulesCheck, setHomeRulesCheck] = useState(true)

  async function createGame() {
    let token = localStorage.getItem("access")

    let payload = {
      title: title,
      description: description,
      platform: platform,
      genres_settings: genresSettings,
      game_systems: gameSystems,
      location: location,
      accessibility: accessibility,
      game_format: gameFormat,
      start_date: startDate,
      language: language,
      home_rules: homeRules,
      // address: address,
      images: images,
      price: price
    }

    let response = await fetch(`${Domain}api/game/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      console.log("Game created", payload)
      test()
      window.location.reload()
    } else {
      console.log("Game created failed", payload)
      if (response.status === 401) {
        const refreshToken = JSON.parse(localStorage.getItem("refresh"))

        const refreshResponse = await fetch(`${Domain}api/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ refresh: refreshToken })
        })

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json()
          localStorage.setItem("access", refreshData.access)

          token = refreshData.access
          response = await fetch(`${Domain}api/game/create/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          })

          if (response.ok) {
            console.log("Ok after refresh", payload)
            window.location.reload()
          } else {
            HandleLogOut()
          }
        } else {
          HandleLogOut()
        }
      }
    }
  }

  const [selectedFile, setSelectedFile] = useState(null)
  function handleFileChange(event) {
    setSelectedFile(event.target.files)
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
        <form onSubmit={(el) => el.preventDefault()}>
          <div>
            <h1>About</h1>
            <p>Title, description, image.</p>
          </div>
          <div>
            <h2>Title</h2>
            <input type="text" placeholder="Ex: Adventure Seekers Expedition" onChange={(el) => setTitle(el.target.value)}></input>
            <h2>Description</h2>
            <input type="text" placeholder="Describe your adventure..." onChange={(el) => setDescription(el.target.value)}></input>
            <h2>Images</h2>
            <input type="file" onChange={handleFileChange}></input>
            <div>
              <button type="button">Remove All</button>
              <button type="submit">Upload</button>
            </div>
          </div>
          <div>
            <h1>General</h1>
            <p>Game Systems, Platform (VTT), Genres & Settings.</p>
          </div>
          <div>
            <h2>Game Systems</h2>
            <input type="text" placeholder="Dungeons & Dragons (5th Edition)" onChange={(el) => setGameSystems(el.target.value)}></input>
            <div>
              <div>
                <h2>Platform (VTT)</h2>
                <input type="text" placeholder="Foundry" onChange={(el) => setPlatform(el.target.value)}></input>
              </div>
              <div>
                <h2>Genres & Settings</h2>
                <input type="text" placeholder="Fantasy" onChange={(el) => setGenresSettings(el.target.value)}></input>
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
              <select onChange={(el) => setAccessibility(el.target.value)}>
                <option>Both</option>
              </select>
            </div>
            <div>
              <h2>Location</h2>
              <select onChange={(el) => setLocation(el.target.value)}>
                <option>London</option>
              </select>
            </div>
            <h2>Game format</h2>
            <select onChange={(el) => setGameFormat(el.target.value)}>
              <option>Short Adventure</option>
            </select>
            <h2>Start date</h2>
            <input type="date" onChange={(el) => setStartDate(el.target.value)}></input>
            <h2>Language</h2>
            <select onChange={(el) => setLanguage(el.target.value)}>
              <option> English</option>
              <option>Russian</option>
            </select>
            <h2>Includes</h2>
            <label htmlFor="rules">
              <input
                type="checkbox"
                id="rules"
                name="rules"
                checked={homeRulesCheck}
                onChange={() => setHomeRulesCheck(!homeRulesCheck)}
              ></input>
              <span></span>
              Home rules
            </label>
            <input type="text" placeholder="Describe your rules..." onChange={(el) => setHomeRules(el.target.value)}></input>
          </div>
          <div>
            <h1>Price</h1>
            <p>Specify the cost of your game</p>
          </div>
          <div>
            <h2>Price</h2>
            <label htmlFor="price">
              <input type="checkbox" id="price" name="price" checked={freePrice} onChange={() => setFreePrice(!freePrice)}></input>
              <span></span>
              Free
            </label>
            <input type="text" placeholder="35.34" onChange={(el) => setPrice(el.target.value)}></input>
          </div>
          <button type="button" style={{ width: "100px" }} onClick={createGame}>
            Create Game
          </button>
        </form>
        <CreateGameButton />
      </Main>
      <Footer />
    </>
  )
}
