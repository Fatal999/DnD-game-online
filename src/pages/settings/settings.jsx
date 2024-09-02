import { useState, useEffect } from "react"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Domain from "../../components/data/domain"
import ErrorPopup from "../../components/popups/error-popup/error-popup"
import SuccessfulPopup from "../../components/popups/successful-popup/succsessful-popup"
import ChangingPassword from "../../components/popups/changing-password/changing-password"
import CreateGameButton from "../../components/ui/create-game-button/create-game-button"
import HandleLogOut from "../../components/utils/handle-log-out"
import { Helmet } from "react-helmet-async"

export default function Settings({ tokensPresent }) {
  const [data, setData] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [errorData, setErrorData] = useState(null)
  const [goodRequest, setGoodRequest] = useState(false)
  const [badRequest, setBadRequest] = useState(false)
  const [changePasswordPopup, setChangePasswordPopup] = useState(false)
  const [usernameChanged, setUsernameChanged] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)

  function openChangePasswordPopup() {
    setChangePasswordPopup(true)
  }

  function onOverlayClick() {
    setChangePasswordPopup(false)
  }

  function showGoodPopup() {
    setGoodRequest(true)
  }

  function showBadPopup() {
    setBadRequest(true)
  }

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem("access")

      let response = await fetch(`${Domain}api/account/settings/`, {
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
            response = await fetch(`${Domain}api/account/settings/`, {
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
      setUsername(data.username || "")
      setEmail(data.email || "")
    }
  }, [data])

  async function handleSubmit(evt) {
    evt.preventDefault()

    let token = localStorage.getItem("access")

    const body = {}

    if (usernameChanged && username !== data.username) {
      body.username = username
    }

    if (emailChanged && email !== data.email) {
      body.email = email
    }

    if (Object.keys(body).length === 0) {
      return
    }

    const response = await fetch(`${Domain}api/account/settings/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })

    const result = await response.json()

    if (response.ok) {
      setData(result)
      showGoodPopup()
      window.location.reload()
    } else {
      setErrorData(result.errors[0])
      showBadPopup()
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <h1>Settings</h1>
        <h2>Account</h2>
        <form onSubmit={handleSubmit}>
          {data ? (
            <div className="main__settings">
              <h3>Username</h3>
              <input
                type="text"
                value={username}
                onChange={(el) => {
                  setUsername(el.target.value)
                  setUsernameChanged(true)
                }}
              />
              <h3>Email</h3>
              <input
                type="email"
                value={email}
                onChange={(el) => {
                  setEmail(el.target.value)
                  setEmailChanged(true)
                }}
              />
              {badRequest && <ErrorPopup error={errorData}></ErrorPopup>}
              {goodRequest && <SuccessfulPopup></SuccessfulPopup>}
              <button type="submit">Save</button>
              <h3>Password</h3>
              <button type="button" onClick={openChangePasswordPopup}>
                Change
              </button>
              <div>
                <h3>Log in with Google</h3>
                <span>Disconnect</span>
              </div>
              <div>
                <h3>Discord Account</h3>
                <span>Disconnect</span>
              </div>
              <CreateGameButton />
            </div>
          ) : (
            <></>
          )}
        </form>
      </Main>
      {changePasswordPopup && <ChangingPassword onOverlayClick={onOverlayClick} />}
      <Footer />
    </>
  )
}
