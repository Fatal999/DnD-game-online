import { useState } from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import HomePage from "../../pages/home"
import RegistrationPopup from "../../popups/registration/registration"
import LogInPopup from "../../popups/log-in/log-in"
import ForgotPassword from "../../popups/forgot-password/forgot-password"
import Filter from "../../popups/filter/filter"

function PageWrapper({ ...prop }) {
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)
  const [data, setData] = useState(null)

  function handleDataFromChild(responseData) {
    setData(responseData)
  }

  function showLogInHandler() {
    setLogInActive(true)
    setRegistrationActive(false)
  }

  function closeLogInHandler() {
    setLogInActive(false)
  }

  function showRegistrationHandler() {
    setRegistrationActive(true)
    setLogInActive(false)
  }

  function closeRegistrationHandler() {
    setRegistrationActive(false)
  }

  function showForgotPasswordHandler() {
    setForgotPasswordActive(true)
    setLogInActive(false)
  }

  function closeForgotPasswordHandler() {
    setForgotPasswordActive(false)
  }

  function showFilterHandler() {
    setFilterActive(true)
  }

  function closeFilterHandler() {
    setFilterActive(false)
  }

  function refreshFilterHandler() {
    setFilterActive(false)
    setFilterActive(true)
  }

      return (
      <>
        <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} />
        <main className="main">
          <HomePage {...prop} />
          {logInActive && (
            <LogInPopup
              onOverlayClick={closeLogInHandler}
              onRegistrationClick={showRegistrationHandler}
              onForgotPasswordClick={showForgotPasswordHandler}
              onDataReceived={handleDataFromChild}
            />
          )}
          {registrationActive && <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandler} />}
          {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />}
          {filterActive && (
            <Filter
              onOverlayClick={closeFilterHandler}
              onRefreshFilterClick={refreshFilterHandler}
              onCloseFilterClick={closeFilterHandler}
            />
          )}
        </main>
        <Footer />
      </>

  // if (setData(null)) {
  //   return (
  //     <>
  //       <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} />
  //       <main className="main">
  //         <HomePage {...prop} />
  //         {logInActive && (
  //           <LogInPopup
  //             onOverlayClick={closeLogInHandler}
  //             onRegistrationClick={showRegistrationHandler}
  //             onForgotPasswordClick={showForgotPasswordHandler}
  //             onDataReceived={handleDataFromChild}
  //           />
  //         )}
  //         {registrationActive && <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandler} />}
  //         {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler} />}
  //         {filterActive && (
  //           <Filter
  //             onOverlayClick={closeFilterHandler}
  //             onRefreshFilterClick={refreshFilterHandler}
  //             onCloseFilterClick={closeFilterHandler}
  //           />
  //         )}
  //       </main>
  //       <Footer />
  //     </>
  //   )
  // } else {
  //   return (
  //     <>
  //       <Header onLoginClick={showLogInHandler} onFilterClick={showFilterHandler} />
  //       <main className="main"></main>
  //       <Footer />
  //     </>
  //   )
  // }
}

export default PageWrapper
