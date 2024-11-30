import { Image, StyleSheet, View, Text, Button, Alert } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
// @ts-expect-error: TODO - Fix me
import { router } from "expo-router";

import * as LocalAuthentication from "expo-local-authentication";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

export default function AuthenticationScreen(props: any) {
  const [hasBiometricsSupport, setHasBiometricsSupoort] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const checkiFBioMetricsSupported = async () => {
      const isBiometricsSupported =
        await LocalAuthentication.hasHardwareAsync();
      setHasBiometricsSupoort(isBiometricsSupported);
    };

    checkiFBioMetricsSupported();
  }, []);

  const onAuthenticateHandler = async () => {
    const authenticatedResponse = await LocalAuthentication.authenticateAsync({
      fallbackLabel: "Failed to login",
    });

    if (authenticatedResponse.success) {
      setIsAuthenticated(true);
      router.replace("/home-screen");
    } else {
      Alert.alert("Authentication failed");
    }
  };

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
          {/* <Link href="/home-screen" asChild> */}

          {hasBiometricsSupport ? (
            <Button title="Login" onPress={onAuthenticateHandler} />
          ) : (
            <Text>
              Biometrics authentication not supported on current device.
            </Text>
          )}
          {/* </Link> */}
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
