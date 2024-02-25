import React, { useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFirebaseContext } from "../../../contexts/firebaseContext.js";
import Button from "../../../components/Button.js";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

const Page = () => {
  const router = useRouter();
  const { userType } = useLocalSearchParams();
  const { currentUser, updateUserData } = useFirebaseContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useLayoutEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });
  }, []);

  const handleSubmission = () => {
    if (!firstName || !lastName || !age || !email) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }
    updateUserData(currentUser, {
      firstName,
      lastName,
      age,
      email,
      completedRegistration: true,
    })
      .then(() => {
        Alert.alert(
          "Registration Successful",
          "You have successfully registered as a " + userType
        );
        router.replace(`/dashboard/${userType}`);
      })
      .catch((err) => {
        Alert.alert(
          "Error",
          "An error occurred while registering you. Please try again later."
        );
      });
  };

  return (
    <View className={`bg-background w-full h-full p-5`}>
      <View className={`${isKeyboardVisible ? "mt-[-60%]" : ""}`}>
        {/*  main Image */}
        <Image
          resizeMode="contain"
          className="h-60 mt-10"
          source={require("../../../public/images/get-started.png")}
        />

        {/* A form which asks for name, age, email address, gender */}
        <View className="p-5 rounded-3xl bg-black mt-10">
          <TextInput
            className="text-foreground py-2 px-3 text-lg w-full bg-input bg-background rounded-xl mb-4"
            placeholder="First Name"
            placeholderTextColor={fullConfig.theme.colors.foreground}
            onChangeText={(val) => setFirstName(val)}
            autoComplete="name"
            inputMode="text"
            textAlign="left"
          />
          <TextInput
            className="text-foreground py-2 px-3 text-lg w-full bg-input bg-background rounded-xl mb-4"
            placeholder="Last Name"
            placeholderTextColor={fullConfig.theme.colors.foreground}
            onChangeText={(val) => setLastName(val)}
            autoComplete="additional-name"
            inputMode="text"
            textAlign="left"
          />
          <TextInput
            className="text-foreground py-2 px-3 text-lg w-full bg-input bg-background rounded-xl mb-4"
            placeholder="Age"
            placeholderTextColor={fullConfig.theme.colors.foreground}
            keyboardType="numeric"
            onChangeText={(val) => setAge(val)}
            inputMode="numeric"
            textAlign="left"
          />
          <TextInput
            className="text-foreground py-2 px-3 text-lg w-full bg-input bg-background rounded-xl mb-4"
            placeholder="Email Address"
            placeholderTextColor={fullConfig.theme.colors.foreground}
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
            autoComplete="email"
            inputMode="email"
            textAlign="left"
          />
          <Button onPress={handleSubmission} squircle colour={"secondary"}>
            Submit Details
          </Button>
          <Pressable onPress={() => router.replace("/intro")}>
            <Text className="text-foreground text-md text-center mt-5">
              Don't want to register as a {userType}? Go back
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Page;
