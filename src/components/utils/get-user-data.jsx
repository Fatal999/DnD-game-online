import { useState, useEffect } from "react"
import Domain from "../../components/data/domain"
import HandleLogOut from "./handle-log-out"

export default function GetUserData() {
  const [data, setData] = useState(null)

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
        console.log("Yep before refresh:", data)
        setData(data)
      } else {
        console.log("Nope before refresh:", data)
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
              console.log("Yep after refresh:", data)
            } else {
              console.log("Nope after refresh:", data)
              HandleLogOut()
            }
          }
        }
      }
    }

    fetchData()
  }, [])

  return { data, HandleLogOut }
}
