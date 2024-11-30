import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function NotFoundScreen() {
  const { id } = useLocalSearchParams();

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
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Detailed Transaction</ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Transaction #{id}</ThemedText>
        {/* TODO: Add detailed transaction */}
        <Link href="/home-screen" style={styles.link}>
          <ThemedText type="link">Back</ThemedText>
        </Link>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
