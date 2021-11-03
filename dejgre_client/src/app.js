//I will rename this later
import React, { useEffect, useState } from "react";
import LoginView from "./apps/auth/loginView";
import axiosRequests from "./generics/axiosShortcuts";
import Dashboard from "./apps/dashboards/core/dashboard";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    handleChangeIsLogged(axiosRequests.checkForToken());
  }, []);

  const handleChangeIsLogged = (value) => {
    setIsLogged(value);
  }

  return (isLogged ? <Dashboard loginRefresh={handleChangeIsLogged}/> : <LoginView loginRefresh={handleChangeIsLogged}/>)
}