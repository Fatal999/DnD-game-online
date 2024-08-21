import { useState, useEffect } from "react"
import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import Domain from "../../components/data/domain"
import ErrorPopup from "../../components/popups/error-popup/error-popup"
import SuccessfulPopup from "../../components/popups/successful-popup/succsessful-popup"
import { Helmet } from "react-helmet-async"

export default function Settings({ tokensPresent }) {
  const [info, setInfo] = useState(null)
  const [username, setUsername] = useState(info ? info.username : "")
  const [email, setEmail] = useState(info ? info.email : "")

  const [errorData, setErrorData] = useState(null)
  const [goodRequest, setGoodRequest] = useState(false)
  const [badRequest, setBadRequest] = useState(false)

  function showGoodPoup() {
    setGoodRequest(true)
  }

  function showBadPopup() {
    setBadRequest(true)
  }

  function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    window.location.reload()
    window.scrollTo({ top: 0, behavior: "smooth" })
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

      let info = await response.json()

      if (response.ok) {
        setInfo(info)
        setUsername(info.username)
        setEmail(info.email)
      } else {
        console.log("Nope:", info)
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

            info = await response.json()

            if (response.ok) {
              setInfo(info)
              setUsername(info.username)
              setEmail(info.email)
            } else {
              console.log("Nope after refresh:", info)
              handleLogout()
            }
          } else {
            handleLogout()
          }
        }
      }
    }

    fetchData()
  }, [])

  async function handleSubmit(evt) {
    evt.preventDefault()
    let token = localStorage.getItem("access")

    const response = await fetch(`${Domain}api/account/settings/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        username: username,
        email: email
      })
    })

    const result = await response.json()

    if (response.ok) {
      setInfo(result)
      showGoodPoup()
      window.location.reload()
    } else {
      console.log("Update failed:", result)
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
          {info ? (
            <div className="main__settings">
              <span>Username</span>
              <input type="text" value={username} onChange={(el) => setUsername(el.target.value)} />
              <span>Email</span>
              <input type="email" value={email} onChange={(el) => setEmail(el.target.value)} />
              {badRequest && <ErrorPopup error={errorData}></ErrorPopup>}
              {goodRequest && <SuccessfulPopup></SuccessfulPopup>}
              <button type="submit">Save</button>
              <span>Password</span>
              <button type="button">Change</button>
              <div>
                <label>Log in with Google</label>
                <span>Disconnect</span>
              </div>
              <div>
                <label>Discord Account</label>
                <span>Disconnect</span>
              </div>
              <button type="button">+</button>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </form>
      </Main>
      <Footer />
    </>
  )
}
