export default function HandleLogOut() {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  window.location.reload()
  window.scrollTo({ top: 0, behavior: "smooth" })
}
