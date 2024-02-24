import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import {useRouter} from "expo-router"
import Button from "../../../components/Button";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleGetOTP = () => {
    router.push("/login/otp/")
  };
  const handleToggleTerms = () => {
    setAgreeTerms(!agreeTerms);
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
        />
      </View>
      <Button onPress={handleGetOTP} colour="primary">Get OTP</Button>

      {/* Terms and Conditions */}
      <TouchableOpacity
        onPress={handleToggleTerms}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          position: "absolute",
          bottom: 20,
        }}>
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#25BEEF",
            marginRight: 8,
            backgroundColor: agreeTerms ? "#25BEEF" : "transparent",
          }}
        />
        <Text style={{ color: "#FFFFFF" }}>
          I agree to all terms and conditions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;
