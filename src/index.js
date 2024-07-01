import { createRoot } from "react-dom/client";

//Rendering home page

import "./styles/styles.css";
import Header from "./jsx/main/header";
import Games from "./jsx/home/games-list";
import LogInPopup from "./jsx/popups/log-in";
import RegistrationPopup from "./jsx/popups/registration";
import ForgotPasswordPopup from "./jsx/popups/forgot-password";
import ChangingPassword from "./jsx/popups/changing-password";
import PasswordChanged from "./jsx/popups/password-changed";
// import UserMenu from "./jsx/home/user-menu";
// import Users from "./jsx/home/user-list";

//Home

const headerElement = createRoot(document.getElementById("header"));
headerElement.render(<Header />);

const gamesElement = createRoot(document.getElementById("games-list"));
gamesElement.render(<Games />);

// const userMenuElement = createRoot(document.getElementById("user-menu"));
// userMenuElement.render(<UserMenu />);

// const usersElement = createRoot(document.getElementById("users-list"));
// usersElement.render(<Users />);

//Log-in

const logInElement = createRoot(document.getElementById("log-in-popup"));
logInElement.render(<LogInPopup />);

//Registration

const registrationElement = createRoot(
  document.getElementById("registration-popup")
);
registrationElement.render(<RegistrationPopup />);

//Forgot password

const forgotPasswordElement = createRoot(
  document.getElementById("forgot-password-popup")
);
forgotPasswordElement.render(<ForgotPasswordPopup />);

//Changing password

const changingPasswordElement = createRoot(
  document.getElementById("changing-password-popup")
);
changingPasswordElement.render(<ChangingPassword />);

//Password changed

const passwordChangedElement = createRoot(
  document.getElementById("password-changed-popup")
);
passwordChangedElement.render(<PasswordChanged />);
