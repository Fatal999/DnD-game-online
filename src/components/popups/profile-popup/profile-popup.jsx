import { useState, useEffect } from "react";

export default function ProfilePopup({ onOverlayClick }) {
    const [data, setData] = useState(null);
  
    function handleLogout() {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.reload();
    }
  
    useEffect(() => {
      async function fetchData() {
        let token = localStorage.getItem('access');
  
        let response = await fetch("https://dnd-game.ru/api/account/settings/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        let data = await response.json();
  
        if (response.ok) {
          setData(data);
        } else {
          console.log("Nope:", data);
          if (response.status === 401) {
            const refreshToken = JSON.parse(localStorage.getItem('refresh'));
  
            const refreshResponse = await fetch("https://dnd-game.ru/api/token/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: refreshToken }),
            });
  
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              localStorage.setItem('access', refreshData.access);
  
              token = refreshData.access;
              response = await fetch("https://dnd-game.ru/api/account/settings/", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                },
              });
  
              data = await response.json();
  
              if (response.ok) {
                setData(data);
              } else {
                console.log("Nope after refresh:", data);
                handleLogout();
              }
            } else {
              handleLogout();
            }
          }
        }
      }
  
      fetchData();
    }, []);
  
    return (
      <div className="main__profile">
        <div className="overlay__profile" onClick={onOverlayClick}></div>
        {data ? (
          <div className="main__profile-wrapper">
            <h1>{data.username}</h1>
            <span>{data.email}</span>
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
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }