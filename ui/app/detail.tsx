import { Image, StyleSheet, View, Button, useColorScheme } from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import NotFoundScreen from "./not-found";
import Animated from "react-native-reanimated";
import { DetailTransaction } from "@/components/DetailTransaction";

export interface DetailTransactionItem {
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
        <View style={[styles.button, styles.backButtonPosition]}>
          <Button title="Back" onPress={() => router.replace("/recent")} />
        </View>
        <View style={[styles.button, styles.logoutButtonPosition]}>
          <Button title="Log out" onPress={onLogoutHandler} />
        </View>
      </Animated.View>
      <View style={{ flex: 1, padding: 20, overflow: "hidden" }}>
        <DetailTransaction
          id={(typeof Array.isArray(id) ? id[0] : id) as string}
          isLoading={isLoading}
          detailTransactionItem={detailTransactionItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#DDDDDD",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: "10%",
  },
  backButtonPosition: {
    position: "absolute",
    top: 5,
    left: 0,
    margin: 25,
  },
  logoutButtonPosition: {
    position: "absolute",
    top: 5,
    right: 0,
    margin: 25,
  },
});
