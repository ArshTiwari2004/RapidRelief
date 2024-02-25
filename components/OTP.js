import { useState, useRef, createRef, useLayoutEffect} from "react";
import { View, TextInput} from "react-native";

const OTP = ({setParentOTP}) => {
  const [otpArr, setOtpArr] = useState([]);
  const refs = useRef([createRef(), createRef(), createRef(), createRef(), createRef(), createRef()]);

  useLayoutEffect(()=>{
    setParentOTP(otpArr.join(''));
  }, [otpArr, setParentOTP])

  return (
    <View className="flex-row gap-2 mb-8">
    {
        Array.from({length: 6}).map((_, index) => (
            <TextInput
                className="text-foreground p-2 text-lg border-b-2 border-foreground text-center"
                inputMode="numeric"
                key={index}
                ref={refs.current[index]}
                value={otpArr[index]}
                onChangeText={(text) => {
                    setOtpArr(prev => {
                        return [...prev.slice(0, index), text, ...prev.slice(index + 1)];
                    });
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