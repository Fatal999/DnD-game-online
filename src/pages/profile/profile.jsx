import Header from "../../components/layout/header/header"
import Main from "../../components/layout/main/main"
import Footer from "../../components/layout/footer/footer"
import { Helmet } from "react-helmet-async"

export default function Profile({ tokensPresent }) {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Header tokensPresent={tokensPresent} />
      <Main>
        <p>Profile</p>
      </Main>
      <Footer />
    </>
  )
}
