function UserMenu() {
 return (
   <div className="main__user-menu">
     <button className="main__user-menu-button main__user-menu-button--active" type="button">All</button>
     <button className="main__user-menu-button main__user-menu-button--disabled" type="button">Games</button>
     <button className="main__user-menu-button main__user-menu-button--disabled" type="button">Users</button>
   </div>
 )
}

export default UserMenu;