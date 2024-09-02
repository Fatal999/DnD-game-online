import { useEffect, useState } from "react"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Path from "../../components/data/path"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import Domain from "../../components/data/domain"
import HandleLogOut from "../../components/utils/handle-log-out"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

export default function Profile({ tokensPresent }) {
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null)

  function handleProfileEditClick() {
    navigate(Path.ProfileEdit)
  }

  const [data, setData] = useState(null)

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
        console.log(data)
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
              console.log(data)
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

  const [availabilityGamesCreated, setAvailabilityGamesCreated] = useState(false)
  useEffect(() => {
    if (data && data.games.length > 0) {
      setAvailabilityGamesCreated(true)
    } else if (data) {
      setAvailabilityGamesCreated(false)
    }
  }, [data])

  const [about, setAbout] = useState(false)
  useEffect(() => {
    if (data && data.about === null) {
      setAbout(false)
    } else if (data) {
      setAbout(true)
    }
  }, [data])

  const [gameSystems, setGameSystems] = useState(false)
  useEffect(() => {
    if (data && data.game_systems.length > 0) {
      setGameSystems(true)
    } else if (data) {
      setGameSystems(false)
    }
  }, [data])

  const [genresAndSettings, setGenresAndSettings] = useState(false)
  useEffect(() => {
    if (data && data.genres_and_settings.length > 0) {
      setGenresAndSettings(true)
    } else if (data) {
      setGenresAndSettings(false)
    }
  }, [data])

  const [conventions, setConventions] = useState(false)
  useEffect(() => {
    if (data && data.conventions.length > 0) {
      setConventions(true)
    } else if (data) {
      setConventions(false)
    }
  }, [data])

  const [contacts, setContacts] = useState(false)
  useEffect(() => {
    if (data && data.contacts_links.length > 0) {
      setContacts(true)
    } else if (data) {
      setContacts(false)
    }
  }, [data])

  const [currentAvatar, setcurrentAvatar] = useState(false)
  useEffect(() => {
    if (data && data.avatar === null) {
      setcurrentAvatar(false)
    } else if (data) {
      setcurrentAvatar(true)
    }
  }, [data])

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0])
  }

  const [avatar, setAvatar] = useState({ avatar: "" })

  async function pushAvatar() {
    if (!selectedFile) return

    let token = localStorage.getItem("access")
    const formData = new FormData()
    formData.append("avatar", selectedFile)

    try {
      let response = await fetch(`${Domain}api/account/profile/avatar/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      let data = await response.json()

      if (response.ok) {
        setAvatar(data)
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
            response = await fetch(`${Domain}api/account/profile/avatar/`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`
              },
              body: formData
            })

            data = await response.json()

            if (response.ok) {
              setAvatar(data)
            } else {
              HandleLogOut()
            }
          } else {
            HandleLogOut()
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  async function deleteAvatar() {
    let token = localStorage.getItem("access")

    try {
      let response = await fetch(`${Domain}api/account/profile/avatar/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      let data = await response.json()

      if (response.ok) {
        setAvatar(data)
        console.log(data)
        setcurrentAvatar(false)
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
            response = await fetch(`${Domain}api/account/profile/avatar/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

            data = await response.json()

            if (response.ok) {
              setAvatar(data)
              console.log(data)
              setcurrentAvatar(false)
            } else {
              HandleLogOut()
            }
          } else {
            HandleLogOut()
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        {data ? (
          <>
            <div>
              <button type="button">Share</button>
              <button type="button" onClick={handleProfileEditClick}>
                Edit
              </button>
            </div>
            <div>
              <input type="file" onChange={handleFileChange} />
              <button type="button" onClick={pushAvatar}>
                Upload pic
              </button>
              <button type="button" onClick={deleteAvatar}>
                Delete pic
              </button>
              {avatar.avatar ? (
                <img src={`${Domain}${avatar.avatar}`} width="152" height="152" alt="Avatar."></img>
              ) : currentAvatar ? (
                <img src={`${Domain}${data.avatar}`} width="152" height="152" alt="Avatar."></img>
              ) : (
                <div>{data.user.username[0]}</div>
              )}
            </div>
            <div>
              <h1>{data.user.username}</h1>
              <label>Forming a Group</label>
            </div>
            <div>
              <h2>Games created</h2>
              <div>
                {availabilityGamesCreated ? (
                  data.games.map((game, id) => (
                    <div key={id}>
                      <h4>{game.title}</h4>
                      <img src={`${Domain}${game.images[0].image}`} width="40" height="40" alt="Pic."></img>
                      <span>Start date: {game.start_date}</span>
                      <span>Seats left: {game.seats_left}</span>
                    </div>
                  ))
                ) : (
                  <p>Nope...</p>
                )}
              </div>
            </div>
            <div>
              <h2>About</h2>
              <div>{about ? <p>{data.about}</p> : <p>Nope...</p>}</div>
            </div>
            <div>
              <h2>Game Experience</h2>
              <h3>Game Systems</h3>
              <div>
                {gameSystems ? data.game_systems.map((system, id) => <label key={id}>{system.game_system}</label>) : <p>Nope...</p>}
              </div>
              <h3>Genres & Settings</h3>
              <div>
                {genresAndSettings ? (
                  data.genres_and_settings.map((settings, id) => <label key={id}>{settings.genre_setting}</label>)
                ) : (
                  <p>Nope...</p>
                )}
              </div>
              <h3>Сonventions</h3>
              <div>
                {conventions ? data.conventions.map((conventions, id) => <label key={id}>{conventions.convention}</label>) : <p>Nope...</p>}
              </div>
            </div>
            <div>
              <h2>Contacts</h2>
              <div>
                {contacts ? (
                  data.contacts_links.map((contact, id) => (
                    <div key={id}>
                      <h3>{contact.name}</h3>
                      <p>{contact.link}</p>
                    </div>
                  ))
                ) : (
                  <p>Nope...</p>
                )}
              </div>
            </div>
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
