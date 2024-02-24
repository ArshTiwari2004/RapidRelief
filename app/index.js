import { Text, View } from "react-native";
import { useFirebaseContext } from "../contexts/firebaseContext";
import { useRouter, useFocusEffect } from "expo-router";
import Spinner from "../components/loading/Spinner";

export default Page = () => {
  const { isLoggedIn, isVolunteer } = useFirebaseContext();
  const router = useRouter();

  useFocusEffect(() => {
    if (isLoggedIn && isVolunteer) {
      // navigate to volunteer dashboard
    } else if (isLoggedIn) {
      // navigate to user dashboard
    } else {
      // navigate to login
      router.replace("/login/user/");
    }
  });

  return (
    <View>
      <Text className="text-red-500 p-5 text-lg">
        <Spinner />
      </Text>
    </View>
  );
};
