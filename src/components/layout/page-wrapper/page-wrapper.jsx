import { useState } from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import HomePage from '../../pages/home'
import RegistrationPopup from '../../popups/registration/registration'
import LogInPopup from '../../popups/log-in/log-in'
import ForgotPassword from '../../popups/forgot-password/forgot-password'
import Filter from '../../popups/filter/filter'

function PageWrapper({ ...prop }) {
  const [logInActive, setLogInActive] = useState(false)
  const [registrationActive, setRegistrationActive] = useState(false)
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false)
  const [filterActive, setFilterActive] = useState(false)

  const showLogInHandler = () => {
    setLogInActive(true)
    setRegistrationActive(false)
  }

  const closeLogInHandler = () => {
    setLogInActive(false)
  }

  const showRegistrationHandler = () => {
    setRegistrationActive(true)
    setLogInActive(false)
  }

  const closeRegistrationHandler = () => {
    setRegistrationActive(false)
  }

  const showForgotPasswordHandler = () => {
   setForgotPasswordActive(true)
   setLogInActive(false)
 }

  const closeForgotPasswordHandler = () => {
    setForgotPasswordActive(false)
  }

  const showFilterHandler = () => {
    setFilterActive(true)
  }

  const closeFilterHandler = () => {
    setFilterActive(false)
  }

  const refreshFilterHandler = () => {
    setFilterActive(false)
    setFilterActive(true)
  }

  return (
    <>
      <Header onLoginBtnClick={showLogInHandler} onFilterClick={showFilterHandler}/>
      <main className="main">
        <HomePage {...prop} />
        {logInActive && <LogInPopup onOverlayClick={closeLogInHandler} onRegistrationClick={showRegistrationHandler} onForgotPasswordClick={showForgotPasswordHandler}/>}
        {registrationActive && <RegistrationPopup onOverlayClick={closeRegistrationHandler} onLogInClick={showLogInHandler}/>}
        {forgotPasswordActive && <ForgotPassword onOverlayClick={closeForgotPasswordHandler}/>}
        {filterActive && <Filter onOverlayClick={closeFilterHandler} onRefreshFilterClick={refreshFilterHandler} onCloseFilterClick={closeFilterHandler}/>}
      </main>
      <Footer />
    </>
  )
}

export default PageWrapper
