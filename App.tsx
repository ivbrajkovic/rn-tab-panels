import { Image, StyleSheet, View, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tabs } from "./src/components/react-native-tabs";

const { width, height } = Dimensions.get("screen");

console.log(width, height);

export default function App() {
  return (
    <View style={styles.container}>
      <Tabs>
        <Image
          source={{
            uri: `https://picsum.photos/${~~width}/${~~height}?${Math.random()}`,
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: `https://picsum.photos/${~~width}/${~~height}?${Math.random()}`,
          }}
          style={styles.image}
        />
        <Image
          source={{
            uri: `https://picsum.photos/${~~width}/${~~height}?${Math.random()}`,
          }}
          style={styles.image}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 100,
    // height: 100,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#ff000040",
  },
  image: {
    resizeMode: "cover",
    width,
    height,
  },
});
