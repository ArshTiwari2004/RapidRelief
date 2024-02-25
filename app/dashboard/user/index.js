import { useLayoutEffect } from "react";
import { Text, View, Image, Linking, Pressable } from "react-native";
import { useFirebaseContext } from "../../../contexts/firebaseContext";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";

const Page = () => {
  const { currentUser } = useFirebaseContext();
  const router = useRouter();

  useLayoutEffect(() => {
    // if for some reason, the user is not logged in
    // redirect
    if (!currentUser) router.replace("/login/phoneNumber");
  }, []);

  return (
    <View className="bg-background w-full h-full">
      <View className="w-full h-1/4 bg-primary px-8 pt-16">
        <View className="flex-row w-full justify-between items-center">
          <Text className="text-xl text-foreground">
            Hello, {currentUser.firstName}
          </Text>
          <Image
            className="w-10 h-10"
            source={require("../../../public/icons/user.png")}
          />
        </View>
        <Image
          className="w-full mt-[-64px]"
          resizeMode="contain"
          source={require("../../../public/images/dashboard-image.png")}
        />
      </View>
      <View className="mt-32 px-8 items-center">
        <Text className="text-lg text-foreground font-bold border-b-2 border-primary pb-4">
          Emergency Services
        </Text>
        {/* 3 Buttons with images and text below them for ambulance, firetruck and police */}
        <View className="flex-row justify-between mt-8 w-full">
          <View>
            <Pressable onPress={()=>Linking.openURL("tel:102")} className="w-20 h-20 bg-primary rounded-full p-3">
              <Image
                className="w-full h-full"
                resizeMode="contain"
                source={require("../../../public/icons/ambulance.png")}
              />
            </Pressable>
            <Text className="text-foreground text-center mt-4">Ambulance</Text>
          </View>
          <View>
            <Pressable onPress={()=>Linking.openURL("tel:101")} className="w-20 h-20 bg-primary rounded-full p-3">
              <Image
                className="w-full h-full"
                resizeMode="contain"
                source={require("../../../public/icons/firetruck.png")}
              />
            </Pressable>
            <Text className="text-foreground text-center mt-4">Fire Truck</Text>
          </View>

          <View>

            <Pressable onPress={()=>Linking.openURL("tel:100")} className="w-20 h-20 bg-primary rounded-full p-3">
              <Image
                className="w-full h-full"
                resizeMode="contain"
                source={require("../../../public/icons/police.png")}
              />
            </Pressable>
            <Text className="text-foreground text-center mt-4">Police</Text>
          </View>
        </View>
      </View>
      <View className="w-full py-8 bg-black mt-8 px-4 flex-row justify-between">
        <Image className="w-[116px] h-16" resizeMode="contain" source={require("../../../public/images/carLogo.png")} />
        <View className="items-end">
            <Text className="text-red text-lg font-bold">CALL FOR HELP</Text>
            <Button colour="red mt-2" small>Find Nearby Volunteers</Button>
        </View>
      </View>
    </View>
  );
};

export default Page;
