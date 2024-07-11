function UserMenu() {
 return (
   <div className="main__user-menu">
     <button className="main__user-menu-toggler main__user-menu-toggler--active" type="button">All</button>
     <button className="main__user-menu-toggler main__user-menu-toggler--disabled" type="button">Games</button>
     <button className="main__user-menu-toggler main__user-menu-toggler--disabled" type="button">Users</button>
   </div>
 )
}

export default UserMenu; 