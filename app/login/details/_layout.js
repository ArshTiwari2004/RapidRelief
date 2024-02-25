import { Stack } from "expo-router";

export default RootLayout = () => {
  /* Hide the stack navigator header */
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};
