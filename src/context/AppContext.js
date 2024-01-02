import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);

  const handleLogin = (val) => {
    console.log("login state updated");
    setUserToken(val);
  };
  const value = {
    userToken,
    handleLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
