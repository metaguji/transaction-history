import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import NotFoundScreen from "./not-found";
import Animated from "react-native-reanimated";

interface DetailTransactionItem {
  date: string;
  amount: string;
  description: string;
  type: string;
  merchantName: string;
  category: string;
}

export default function DetailTransactionScreen() {
  const [detailTransactionItem, setDetailTransactionItem] = useState<
    DetailTransactionItem | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  const getDetailTransactionData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/transactions/items/${id}`
      );
      const jsonData = await response.json();
      setDetailTransactionItem(jsonData);
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
        ]}
      >
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
        <View style={styles.button2}>
          <Button title="Back" onPress={() => router.replace("/recent")} />
        </View>
        <View style={styles.button}>
          <Button title="Log out" onPress={onLogoutHandler} />
        </View>
      </Animated.View>
      <View style={{ flex: 1, padding: 20, overflow: "hidden" }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Transaction Id: {id}
            </Text>
            <View style={styles.content}>
              <Text>Date: {detailTransactionItem?.date}</Text>
              <Text>Amount: {detailTransactionItem?.amount}</Text>
              <Text>Description: {detailTransactionItem?.description}</Text>
              <Text>Type: {detailTransactionItem?.type}</Text>
              <Text>Merchant name: {detailTransactionItem?.merchantName}</Text>
              <Text>Category: {detailTransactionItem?.category}</Text>
            </View>
          </View>
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
  button2: {
    position: "absolute",
    top: 5,
    left: 0,
    margin: 25,
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: "10%",
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
    borderRadius: "10%",
  },
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#DDDDDD",
    borderRadius: "3%",
  },
  content: {
    paddingVertical: 15,
    gap: 5,
  },
});
