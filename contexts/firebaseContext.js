import { createContext, useState, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Spinner from "../components/loading/Spinner";
import { query } from "firebase/firestore";
import { Alert } from "react-native";

const FirebaseContext = createContext();
export const useFirebaseContext = () => useContext(FirebaseContext);

const FirebaseContextProvider = ({ children }) => {
  const [confirm, setConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle login
  function onAuthStateChanged(user) {
    if (user != null) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            setCurrentUser({...querySnapshot.data(), uid: user.uid});
          }
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      const userCredential = await confirm.confirm(code);
      setCurrentUser(userCredential.user);
      console.log("User signed in successfully", userCredential.user);
      // create a new user in the database
      const existingUser = await firestore()
        .collection("users")
        .where("phoneNumber", "==", phoneNumber)
        .get();

      if (!existingUser?.exists) {
        await firestore().collection("users").doc(userCredential.user.uid).set({
          phoneNumber: phoneNumber,
          completedRegistration: false,
        });
      }
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async function updateUserData(user, data) {
    try {
      await firestore().collection("users").doc(user.uid).update(data);
      setCurrentUser({...currentUser, ...data});
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
        confirmCode,
        signInWithPhoneNumber,
        updateUserData,
        setPhoneNumber,
        phoneNumber
      }}>
      {isLoading ? <Spinner /> : children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContextProvider;
