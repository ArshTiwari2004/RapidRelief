import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import {useRouter} from "expo-router";
import Button from "../../../components/Button";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";
import OTP from "../../../components/OTP";

const fullConfig = resolveConfig(tailwindConfig);

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-background p-5">
      <Image
        className="h-48 w-48 mb-10"
        source={require("../../../public/images/otp.png")}
      />
      <View>
        <Text className="font-bold text-foreground text-lg mb-2">
            Enter The 4-Digit Code Sent To
        </Text>
        <Text className="text-foreground text-md mb-10">Your Phone Number</Text>
      </View>
      <OTP />
      <Button onPress={()=>router.push("/intro/")} colour="primary">Verify OTP</Button>
    </View>
  );
};

export default Page;
