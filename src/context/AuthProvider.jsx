import { createContext, useState } from "react";

const AppContext = createContext({
  isLoggedIn: false,
  setisLoggedIn: () => null,
});

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  return (
    <AppContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
