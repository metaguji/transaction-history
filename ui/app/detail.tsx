import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

// @ts-expect-error: TODO - Fix me
import { Link, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import NotFoundScreen from "./+not-found";
import Animated from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function DetailTransaction() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  const getDetailTransactionData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/transactions/items/${id}`
      );
      const json = await response.json();
      console.log({ json });
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getDetailTransactionData();
  }, []);

  const colorScheme = useColorScheme() ?? "light";

  const onLogoutHandler = () => {
    setIsAuthenticated(false);
    router.replace("/");
  };

  if (!isAuthenticated) {
    return <NotFoundScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.header,
          {
            padding: 32,
            backgroundColor: { light: "#A1CEDC", dark: "#1D3D47" }[colorScheme],
          },
          //   headerAnimatedStyle,
        ]}
      >
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
        <View style={styles.button}>
          <Button title="Log out" onPress={onLogoutHandler} />
        </View>
      </Animated.View>
      <View style={{ flex: 1, padding: 10, gap: 16, overflow: "hidden" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Detailed Transaction
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ThemedView style={styles.container}>
            <ThemedText type="title">Transaction #{id}</ThemedText>
            <View>
              <Text>#{data?.id}</Text>
              <Text>{data?.date}</Text>
              <Text>{data?.amount}</Text>
              <Text>{data?.description}</Text>
              <Text>{data?.type}</Text>
              <Text>{data?.merchantName}</Text>
              <Text>{data?.category}</Text>
            </View>
            <Link href="/recent" style={styles.link}>
              <ThemedText type="link">Back</ThemedText>
            </Link>
          </ThemedView>
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  button: {
    position: "absolute",
    top: 5,
    right: 0,
    margin: 25,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: "5%",
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
});
