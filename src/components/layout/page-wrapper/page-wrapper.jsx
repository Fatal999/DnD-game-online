import Header from "../header/header" 
import Footer from "../footer/footer"
import HomePage from "../../pages/home"

function PageWrapper({ ...prop }) {
 return (
  <>
   <Header />
    <main className="main">
     <HomePage { ...prop }/>
    </main>
   <Footer />
  </>
 )
}

export default PageWrapper;