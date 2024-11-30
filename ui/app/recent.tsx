import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { Divider, useTheme } from "@rneui/themed";
// @ts-expect-error: TODO - Fix me
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import NotFoundScreen from "./+not-found";
import Animated from "react-native-reanimated";

export default function RecentTransactions() {
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const getRecentTransactionData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/transactions/recent"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
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
          Recent Transactions
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.map((d, i) => {
            return (
              <View key={`{${i}-${d.date}}`}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text>{d.date}</Text>
                  <Text>{d.description}</Text>
                  <Text>{d.amount}</Text>
                  <Text>{d.type}</Text>
                  <Link
                    href={{
                      pathname: "/detail",
                      params: { id: d.id },
                    }}
                    asChild
                  >
                    <Button title="More" />
                  </Link>
                </View>
                <Divider width={2} color={theme?.colors?.divider} />
              </View>
            );
          })
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
});
