export default function ProfilePopup({onOverlayClick}) {
    function handleLogout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.reload();
    }

    return (
        <div className="main__profile">
            <div className="overlay__profile" onClick={onOverlayClick}></div>
            <div className="main__profile-wrapper">
                <h1>User name</h1>
                <span>User email</span>
                <ul>
                   <li>Home</li>
                   <li>Profile</li>
                   <li>Games</li>
                   <li>Settings</li>
                   <li>
                        <button type="button" onClick={handleLogout}>Log Out</button>
                   </li>
                </ul>
            </div>
        </div>
    )
}