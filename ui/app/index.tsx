import { router, useNavigation } from "expo-router";
import { Alert, Button, Text, View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../contexts/AuthProvider";

export default function AuthenticationScreen() {
  const navigation = useNavigation();
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

  const onAuthenticatedHandler = async () => {
    const authenticatedResponse = await LocalAuthentication.authenticateAsync({
      fallbackLabel: "Failed to login",
    });

    if (authenticatedResponse.success) {
      setIsAuthenticated(true);
      router.replace("/recent");
    } else {
      Alert.alert("Authentication failed");
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.button}>
        {hasBiometricsSupport ? (
          <Button title="Login" onPress={onAuthenticatedHandler} />
        ) : (
          <Text>
            Biometrics authentication not supported on current device.
          </Text>
        )}
      </View>
    </View>
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
