import { useState } from "react";

const useLogInActive = (initialValue = false) => {
  const [logInActive, setLogInActive] = useState(initialValue);

  const activateLogIn = () => setLogInActive(true);
  const deactivateLogIn = () => setLogInActive(false);

  return { logInActive, activateLogIn, deactivateLogIn };
};

export default useLogInActive;
