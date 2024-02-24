import { createContext, useState, useContext } from "react"

const FirebaseContext = createContext();
export const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);

  return (
    <FirebaseContext.Provider value={{isLoggedIn, isVolunteer}}>
      {children}
    </FirebaseContext.Provider>  
  )
}

export default FirebaseContextProvider;