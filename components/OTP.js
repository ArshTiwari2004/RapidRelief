import { useState, useRef, createRef } from "react";
import { View, TextInput} from "react-native";

const OTP = () => {
  const [otp, setOtp] = useState([]);
  const refs = useRef([createRef(), createRef(), createRef(), createRef()]);

  return (
    <View className="flex-row gap-2 mb-8">
    {
        Array.from({length: 4}).map((_, index) => (
            <TextInput
                className="text-foreground p-2 text-lg border-b-2 border-foreground text-center"
                key={index}
                ref={refs.current[index]}
                value={otp[index]}
                onChangeText={(text) => {
                    if (isNaN(text)) return;
                    setOtp([...otp.map((d, i) => (i === index ? text : d))]);
                    if (text) {
                        refs.current[index + 1]?.current?.focus();
                    } else {
                        refs.current[index - 1]?.current?.focus();
                    }
                }}
                id={`otp-${index}`}
                maxLength={1}
                keyboardType="phone-pad"
            />
        ))
    }
    </View>
  )
}

export default OTP;