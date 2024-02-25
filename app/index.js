import { Text, View } from "react-native";
import { useFirebaseContext } from "../contexts/firebaseContext";
import { useRouter, useFocusEffect } from "expo-router";
import Spinner from "../components/loading/Spinner";

export default Page = () => {
  const { currentUser } = useFirebaseContext();
  const router = useRouter();

  useFocusEffect(() => {
    if (currentUser && !currentUser.completedRegistration) {
      router.replace("/intro");
    } else if (currentUser && currentUser.completedRegistration) {
      // check if user is a volunteer or a user
      if (currentUser?.isVolunteer) {
        router.replace("/dashboard/volunteer");
      } else {
        router.replace("/dashboard/user");
      }
    } else {
      // navigate to login
      router.replace("/login/phoneNumber/");
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
