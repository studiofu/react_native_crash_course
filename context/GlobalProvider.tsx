import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite/types/models";

interface GlobalContextProps {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
  user: Models.Document | null;
  setUser: (value: any) => void;
  loading: boolean;

}

const GlobalContext = createContext<GlobalContextProps>({
  isLogged: false,
  setIsLogged: () => {},
  user: null,
  setUser: () => {},
  loading: true,
});

export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: React.ReactNode;
}

const GlobalProvider = ({ children } : 
  GlobalProviderProps
) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {

          //console.log(`res:`, res);

          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
