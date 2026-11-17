import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor: "gray",
        padding: "20px",
        margin: "2px",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>
        Edit src/app/index.tsx to edit this screen.
      </Text>
      <Text>This is the first line on android</Text>

      <Link href={"/about"} style={{ fontSize = "20px" }}>
        More on about
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
