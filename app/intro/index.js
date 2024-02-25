import { View, Text, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import {useRouter} from "expo-router";

const Page = () => {
  const router = useRouter();
  return (
    <View className="bg-background w-full h-full">
      {/*  for photo */}
      <View className="w-full h-72 bg-black rounded-b-3xl justify-end items-center">
        <Image
          source={require("../../public/images/registration.png")}
          className="h-44 mb-10"
          resizeMode="contain"
        />
      </View>
      <View className="p-10">
        <View className="mb-12">
          <Text className="font-thin text-foreground text-lg mb-2">
            Get the care you need
          </Text>
          <Text className="font-bold text-3xl text-foreground mb-6">
            Sign Up as a User
          </Text>
          <Button onPress={()=>{
            router.push("/login/details/user");
          }} bold colour="primary">Register as a User</Button>
        </View>

        <View>
          <Text className="font-thin text-foreground text-lg mb-2">
            Make a difference by helping others
          </Text>
          <Text className="font-bold text-3xl text-foreground mb-6">
            Sign Up as a Volunteer
          </Text>
          <Button onPress={()=>{
            router.push("/login/details/volunteer");
          }} bold colour="primary">Register as a Volunteer</Button>
        </View>
      </View>
    </View>
  );
};

export default Page;
