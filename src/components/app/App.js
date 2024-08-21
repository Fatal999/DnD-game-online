import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HelmetProvider } from 'react-helmet-async'
import Home from "../../pages/home/home.jsx"
import Games from "../../pages/games/games.jsx"
import Profile from "../../pages/profile/profile.jsx"
import NotFound from "../../pages/not-found/not-found.jsx"
import Settings from "../../pages/settings/settings.jsx"
import ScrollToTop from "../utils/scroll-to-top.jsx"
import Path from "../data/path.jsx"
import "../../styles/styles.css"

function App() {
  const [tokensPresent, setTokensPresent] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem("access")
    const refreshToken = localStorage.getItem("refresh")

    if (accessToken && refreshToken) {
      setTokensPresent(true)
    } else {
      setTokensPresent(false)
    }
  }, [])

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={Path.Home} element={<Home tokensPresent={tokensPresent}/>} />

          {tokensPresent && (<Route path={Path.Profile} element={<Profile tokensPresent={tokensPresent}/>} />)}

          {tokensPresent && (<Route path={Path.Games} element={<Games tokensPresent={tokensPresent}/>} />)}

          {tokensPresent && (<Route path={Path.Settings} element={<Settings tokensPresent={tokensPresent}/>} />)}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
