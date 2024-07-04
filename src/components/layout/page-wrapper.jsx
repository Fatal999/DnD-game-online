import Header from "../layout/header"
import Footer from "../layout/footer"
import HomePage from "../pages/home"

function PageWrapper({ ...prop }) {
 return (
  <>
   <Header />
    <main>
     <HomePage { ...prop }/>
    </main>
   <Footer />
  </>
 )
}

export default PageWrapper;