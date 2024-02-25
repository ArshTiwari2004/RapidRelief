import React, { useState } from "react";
import { View, TextInput, Alert, Image } from "react-native";
import {useRouter} from "expo-router"
import Button from "../../../components/Button.js";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config.js'
import { useFirebaseContext } from "../../../contexts/firebaseContext.js";

const fullConfig = resolveConfig(tailwindConfig)

const Page = () => {
  const router = useRouter();
  const {phoneNumber, setPhoneNumber, signInWithPhoneNumber} = useFirebaseContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Get OTP");

  const handleGetOTP = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert("Invalid Phone Number", "Please enter a valid phone number");
      return;
    }
    setIsDisabled(true)
    setButtonText("Sending OTP...");
    signInWithPhoneNumber("+91" + phoneNumber).then(()=>{
      router.replace("/login/otp");
    }).catch(()=>{
      Alert.alert("Error", "An error occurred while sending the OTP. Please try again later.");
      setIsDisabled(false)
      setButtonText("Get OTP");
    })
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333333",
        padding: 20,
      }}>
      
      <Image resizeMode="contain" className="h-44 mb-10" source={require("../../../public/images/reception.png")} />

      <View className="border-red p-5 flex-row items-center gap-3">
        <Image
          className="w-8 h-8"
          source={require("../../../public/icons/phone.png")}
        />
        <TextInput
          className="text-foreground py-4 px-2 text-lg"
          placeholder="Enter your phone number"
          placeholderTextColor={fullConfig.theme.colors.foreground}
          keyboardType="phone-pad"
          onChangeText={(val) => setPhoneNumber(val)}
          autoComplete="tel"
          inputMode="tel"
          maxLength={10}
          textAlign="right"
        />
      </View>
      <Button disabled={isDisabled} onPress={handleGetOTP} colour="primary">{buttonText}</Button>
    </View>
  );
};

export default Page;
