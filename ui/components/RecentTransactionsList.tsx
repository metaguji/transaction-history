import { RecentTransactionItem } from "@/app/recent";
import { Divider, useTheme } from "@rneui/themed";
import { Link } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "react-native";

export function RecentTransactionsList({
  isLoading,
  isError,
  recentTransactions,
}: {
  isLoading: boolean;
  isError: boolean;
  recentTransactions: RecentTransactionItem[];
}) {
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ padding: 50 }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError || !recentTransactions.length) {
    return (
      <View
        style={{
          padding: 50,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text>No recent transactions found.</Text>
      </View>
    );
  }

  return recentTransactions.map(
    ({ id, date, description, amount, type }, i) => {
      return (
        <View key={`${i}-${date}`}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text>{date}</Text>
            <Text>{description}</Text>
            <Text>{amount}</Text>
            <Text>{type}</Text>
            <Link
              href={{
                pathname: "/detail",
                params: { id },
              }}
              asChild
            >
              <Button title="More" />
            </Link>
          </View>
          <Divider width={2} color={theme?.colors?.divider} />
        </View>
      );
    }
  );
}
