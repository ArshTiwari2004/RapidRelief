import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import {useRouter} from "expo-router";
import Button from "../../../components/Button";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";
import OTP from "../../../components/OTP";
import { useFirebaseContext } from "../../../contexts/firebaseContext.js";

const fullConfig = resolveConfig(tailwindConfig);

const Page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(0);
  const {confirmCode} = useFirebaseContext();
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Verify OTP");

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a valid OTP");
      return;
    }
    setIsDisabled(true);
    setButtonText("Verifying OTP...");
    confirmCode(otp).then(()=>{
      Alert.alert("Success", "You have successfully logged in.");
      router.replace("/intro");
    }).catch((err)=>{
      Alert.alert("Error", err);
      setIsDisabled(false);
      setButtonText("Try Again");
    });
  }

  return (
    <View className="flex-1 justify-center items-center bg-background p-5">
      <Image
        className="h-48 w-48 mb-10"
        source={require("../../../public/images/otp.png")}
      />
      <View>
        <Text className="font-bold text-foreground text-lg mb-2">
            Enter The 6-Digit Code Sent To
        </Text>
        <Text className="text-foreground text-md mb-10">Your Phone Number</Text>
      </View>
      <OTP setParentOTP={setOtp} />
      <Button disabled={isDisabled} onPress={handleVerifyOTP} colour="primary">{buttonText}</Button>
    </View>
  );
};

export default Page;
