export default function LogInUserList() {
  return (
    <div className="main__log-in-user-menu">
      <button className="main__log-in-user-menu-toggler main__log-in-user-menu-toggler--active" type="button">
        Created
      </button>
      <button className="main__log-in-user-menu-toggler main__log-in-user-menu-toggler--disabled" type="button">
        Saved
      </button>
    </div>
  )
}
