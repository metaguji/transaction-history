import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const mockData = [
    { date: "01/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "02/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "03/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "04/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "05/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "06/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "07/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "08/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "09/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "10/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "11/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "12/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "13/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "14/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "15/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "16/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "17/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "18/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "19/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
    { date: "20/10/24", amount: "10.95", description: "Latte", type: "CREDIT" },
  ];
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Recent Transactions</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Text>Date</Text>
          <Text>Description</Text>
          <Text>Amount</Text>
          <Text>Type</Text>
        </View>
        <View>
          {mockData.map((d, i) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <Text key={i}>{d.date}</Text>
                <Text key={i}>{d.description}</Text>
                <Text key={i}>{d.amount}</Text>
                <Text key={i}>{d.type}</Text>
              </View>
            );
          })}
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
