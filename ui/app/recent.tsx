import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  useColorScheme,
} from "react-native";

import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import NotFoundScreen from "./not-found";
import Animated from "react-native-reanimated";
import { RecentTransactionsList } from "@/components/RecentTransactionsList";

export interface RecentTransactionItem {
  id: string;
  date: string;
  amount: string;
  description: string;
  type: string;
}

export default function RecentTransactionsScreen() {
  const [recentTransactions, setRecentTransactions] = useState<
    RecentTransactionItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const getRecentTransactionData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/transactions/recent"
      );
      const jsonData = await response.json();
      setRecentTransactions(jsonData);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const colorScheme = useColorScheme() ?? "light";

  const onLogoutHandler = () => {
    setIsAuthenticated(false);
    router.replace("/");
  };

  useEffect(() => {
    setIsLoading(true);
    getRecentTransactionData();
  }, []);

  if (!isAuthenticated) {
    return <NotFoundScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            {
              padding: 40,
              backgroundColor: { light: "#A1CEDC", dark: "#1D3D47" }[
                colorScheme
              ],
            },
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
        <View style={{ flex: 1, padding: 20, overflow: "hidden" }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Recent Transactions
            </Text>
          </View>
          <RecentTransactionsList
            isLoading={isLoading}
            isError={isError}
            recentTransactions={recentTransactions}
          />
        </View>
      </Animated.ScrollView>
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
});
