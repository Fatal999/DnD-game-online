import Header from "../header/header" 
import Footer from "../footer/footer"
import HomePage from "../../pages/home"
// import Filter from "../../blocks/filter/filter"

function PageWrapper({ ...prop }) {
 return (
  <>
   <Header />
    <main className="main">
     <HomePage { ...prop }/>
     {/* <Filter></Filter> */}
    </main>
   <Footer />
  </>
 )
}

export default PageWrapper;