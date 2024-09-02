import { useEffect, useState } from "react"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import HandleLogOut from "../../components/utils/handle-log-out"
import Domain from "../../components/data/domain"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

export default function ProfileEdit({ tokensPresent }) {
  const navigate = useNavigate()

  function handleProfileClick() {
    navigate(Path.Profile)
  }

  const [data, setData] = useState(null)
  const [gameSystems, setGameSystems] = useState(false)
  const [genresAndSettings, setGenresAndSettings] = useState(false)
  const [conventions, setConventions] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [displayNameChanged, setDisplayChanged] = useState(false)
  const [about, setAbout] = useState("")
  const [aboutChanged, setAboutChanged] = useState(false)
  const [gameSystemsInput, setGameSystemsInput] = useState([])
  const [gameSystemsInputChanged, setGameSystemsInputChanged] = useState(false)
  const [genresAndSettingsInput, setGenresAndSettingsInput] = useState([])
  const [genresAndSettingsInputChanged, setGenresAndSettingsInputChanged] = useState(false)
  const [conventionsInput, setConventionsInput] = useState([])
  const [conventionsInputChanged, setConventionsInputChanged] = useState(false)
  const [contacts, setContacts] = useState([{ name: "", link: "" }])
  const [contactsChanged, setСontactsChanged] = useState(false)
  const [displayContacts, setDisplayContacts] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("access")

      let response = await fetch(`${Domain}api/account/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      let data = await response.json()

      if (response.ok) {
        setData(data)
      } else {
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
            response = await fetch(`${Domain}api/account/profile/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            })

            data = await response.json()

            if (response.ok) {
              setData(data)
            } else {
              HandleLogOut()
            }
          } else {
            HandleLogOut()
          }
        }
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (data) {
      setDisplayName(data.display_name || "")
      setAbout(data.about || "")
      setGameSystemsInput(data.game_systems || [])
      setGenresAndSettingsInput(data.genres_and_settings || [])
      setConventionsInput(data.conventions || [])
      setContacts(data.contacts_links || [{ name: "", link: "" }])
      setDisplayContacts(data.display_contacts || true)
    }
  }, [data])

  useEffect(() => {
    if (data && data.game_systems.length > 0) {
      setGameSystems(true)
    } else if (data) {
      setGameSystems(false)
    }
  }, [data])

  useEffect(() => {
    if (data && data.genres_and_settings.length > 0) {
      setGenresAndSettings(true)
    } else if (data) {
      setGenresAndSettings(false)
    }
  }, [data])

  useEffect(() => {
    if (data && data.conventions.length > 0) {
      setConventions(true)
    } else if (data) {
      setConventions(false)
    }
  }, [data])

  async function handleSave() {
    let token = localStorage.getItem("access")

    const body = {}

    if (displayNameChanged && displayName !== data.display_name) {
      body.display_name = displayName
    }

    if (aboutChanged && about !== data.about) {
      body.about = about
    }

    if (gameSystemsInputChanged && gameSystemsInput.join("") !== "") {
      body.game_systems = gameSystemsInput
    }

    if (genresAndSettingsInputChanged && genresAndSettingsInput.join("") !== "") {
      body.genres_and_settings = genresAndSettingsInput
    }

    if (conventionsInputChanged && conventionsInput.join("") !== "") {
      body.conventions = conventionsInput
    }

    if (contactsChanged) {
      body.contacts_links = contacts
    }

    body.display_contacts = displayContacts

    if (Object.keys(body).length === 0) {
      return
    }

    let response = await fetch(`${Domain}api/account/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    if (response.ok) {
      console.log("Profile updated successfully", body)
      // window.location.reload()
    } else {
      console.log("Failed to update profile", body)
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
          response = await fetch(`${Domain}api/account/profile/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
          })

          if (response.ok) {
            console.log("Ok after refresh", body)
            // window.location.reload()
          } else {
            HandleLogOut()
          }
        } else {
          HandleLogOut()
        }
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Profile Edit</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        {data ? (
          <>
            <button type="button" style={{ width: "100px" }} onClick={handleProfileClick}>
              &#8249; Profile
            </button>
            <form onSubmit={(el) => el.preventDefault()}>
              <div>
                <h1>About</h1>
                <p>Tell the other players a little bit about yourself</p>
              </div>
              <div>
                <h2>Display Name</h2>
                <input
                  type="text"
                  name="display_name"
                  placeholder={displayName}
                  value={displayName}
                  onChange={(el) => {
                    setDisplayName(el.target.value)
                    setDisplayChanged(true)
                  }}
                />
                <h2>About</h2>
                <textarea
                  name="about"
                  placeholder={about}
                  value={about}
                  onChange={(el) => {
                    setAbout(el.target.value)
                    setAboutChanged(true)
                  }}
                />
              </div>
              <div>
                <h1>Game Experience</h1>
                <p>Describe your experience playing tabletop role-playing games</p>
              </div>
              <div>
                <h2>Game Systems</h2>
                <input
                  type="text"
                  name="game_systems"
                  placeholder="Type here"
                  value={undefined}
                  onChange={(el) => {
                    setGameSystemsInput(el.target.value.split(", "))
                    setGameSystemsInputChanged(true)
                  }}
                />
                <div>
                  {gameSystems ? (
                    data.game_systems.map((system, id) => (
                      <div key={id}>
                        <label>{system.game_system}</label>
                        <button type="button">X</button>
                      </div>
                    ))
                  ) : (
                    <p>Nope...</p>
                  )}
                </div>
              </div>
              <div>
                <h2>Genres & Settings</h2>
                <input
                  type="text"
                  name="genres_and_settings"
                  placeholder="Type here"
                  value={undefined}
                  onChange={(el) => {
                    setGenresAndSettingsInput(el.target.value.split(", "))
                    setGenresAndSettingsInputChanged(true)
                  }}
                />
                <div>
                  {genresAndSettings ? (
                    data.genres_and_settings.map((settings, id) => (
                      <div key={id}>
                        <label>{settings.genre_setting}</label>
                        <button type="button">X</button>
                      </div>
                    ))
                  ) : (
                    <p>Nope...</p>
                  )}
                </div>
              </div>
              <div>
                <h2>Conventions</h2>
                <input
                  type="text"
                  name="conventions"
                  placeholder="Type here"
                  value={undefined}
                  onChange={(el) => {
                    setConventionsInput(el.target.value.split(", "))
                    setConventionsInputChanged(true)
                  }}
                />
                <div>
                  {conventions ? (
                    data.conventions.map((convention, id) => (
                      <div key={id}>
                        <label>{convention.convention}</label>
                        <button type="button">X</button>
                      </div>
                    ))
                  ) : (
                    <p>Nope...</p>
                  )}
                </div>
              </div>
              <div>
                <h1>Contacts</h1>
                <p>You can provide your contacts where you can be reached.</p>
              </div>
              <div>
                <h2>Links</h2>
                <div>
                  {contacts.map((contact, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name="contact_name"
                        placeholder="Type here..."
                        value={contact.name}
                        onChange={(el) => {
                          const newContacts = [...contacts]
                          newContacts[index].name = el.target.value
                          setContacts(newContacts)
                          setСontactsChanged(true)
                        }}
                      />
                      <input
                        type="text"
                        name="contact_link"
                        placeholder="Type here..."
                        value={contact.link}
                        onChange={(el) => {
                          const newContacts = [...contacts]
                          newContacts[index].link = el.target.value
                          setContacts(newContacts)
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setContacts([...contacts, { name: "", link: "" }])}>
                  + Add more
                </button>
                <label htmlFor="contacts">
                  <input
                    type="checkbox"
                    id="contacts"
                    name="display_contacts"
                    checked={displayContacts}
                    onChange={() => setDisplayContacts(!displayContacts)}
                  />
                  <span></span>
                  Display your contacts
                </label>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          <></>
        )}
        <CreateGameButton />
      </Main>
      <Footer />
    </>
  )
}
