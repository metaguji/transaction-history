import { DetailTransactionItem } from "@/app/detail";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function DetailTransaction({
  id,
  isLoading,
  detailTransactionItem,
}: {
  id: string;
  isLoading: boolean;
  detailTransactionItem: DetailTransactionItem | undefined;
}) {
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!detailTransactionItem) {
    return (
      <View>
        <Text>Unable to process request.</Text>
      </View>
    );
  }

  const { date, amount, description, type, merchantName, category } =
    detailTransactionItem;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Id: {id}</Text>
      <View style={styles.content}>
        <Text>Date: {date}</Text>
        <Text>Amount: {amount}</Text>
        <Text>Description: {description}</Text>
        <Text>Type: {type}</Text>
        <Text>Merchant name: {merchantName}</Text>
        <Text>Category: {category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#DDDDDD",
    borderRadius: "3%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    paddingVertical: 15,
    gap: 5,
  },
});
