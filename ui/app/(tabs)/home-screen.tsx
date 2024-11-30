import {
  Image,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Divider, useTheme } from "@rneui/themed";
// @ts-expect-error: TODO - Fix me
import { Link } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import NotFoundScreen from "../+not-found";

// const mockData = [
//   {
//     id: "1",
//     date: "01/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "2",
//     date: "02/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "3",
//     date: "03/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "4",
//     date: "04/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "5",
//     date: "05/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "6",
//     date: "06/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "7",
//     date: "07/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "8",
//     date: "08/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "9",
//     date: "09/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "10",
//     date: "10/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "11",
//     date: "11/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "12",
//     date: "12/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "13",
//     date: "13/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "14",
//     date: "14/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "15",
//     date: "15/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "16",
//     date: "16/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "17",
//     date: "17/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "18",
//     date: "18/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "19",
//     date: "19/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
//   {
//     id: "20",
//     date: "20/10/24",
//     amount: "10.95",
//     description: "Latte",
//     type: "CREDIT",
//   },
// ];

export default function HomeScreen() {
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

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

  useEffect(() => {
    setIsLoading(true);
    getRecentTransactionData();
  }, []);

  return isAuthenticated ? (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Recent Transactions</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View>
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
                        pathname: "/detail-screen",
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
      </ThemedView>
    </ParallaxScrollView>
  ) : (
    <NotFoundScreen />
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
});
