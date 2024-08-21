import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import GamesMenu from "../games/components/games-menu/games-menu"
import { Helmet } from "react-helmet-async"

export default function Games({ tokensPresent }) {
  return (
    <>
      <Helmet>
        <title>Games</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <h1>Games</h1>
        <GamesMenu />
      </Main>
      <Footer />
    </>
  )
}
