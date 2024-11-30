import { Image, StyleSheet, View, Text, Pressable } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@rneui/themed";
import { Link } from "expo-router";

export default function AuthenticationScreen() {
  const { theme } = useTheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}></ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View style={styles.button}>
          {/* TODO: Add biometrics authentication */}
          <Link href="/home-screen" asChild>
            <Pressable>
              <Text>Login</Text>
            </Pressable>
          </Link>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    height: "100%",
    alignContent: "center",
    alignItems: "center",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: "5%",
  },
});
