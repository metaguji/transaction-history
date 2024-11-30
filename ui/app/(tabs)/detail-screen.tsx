import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import NotFoundScreen from "../+not-found";

export default function DetailScreen() {
  const { isAuthenticated } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

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

  if (!isAuthenticated) {
    return <NotFoundScreen />;
  }

  return isLoading ? (
    <ActivityIndicator />
  ) : (
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
        <View>
          <Text>#{data?.id}</Text>
          <Text>{data?.date}</Text>
          <Text>{data?.amount}</Text>
          <Text>{data?.description}</Text>
          <Text>{data?.type}</Text>
          <Text>{data?.merchantName}</Text>
          <Text>{data?.category}</Text>
        </View>
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
