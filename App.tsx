import { Image, StyleSheet, View, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Panel, TabHeader, TabItem, Tabs } from "./src/components/rn-tab-list";

const { width, height } = Dimensions.get("screen");

console.log(width, height);

export default function App() {
  return (
    <View style={styles.container}>
      <Tabs>
        <Panel onIndexChange={(index) => console.log(index)}>
          <ScrollView pagingEnabled>
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
            <Image
              source={{
                uri: `https://picsum.photos/${~~width}/${~~height}?${Math.random()}`,
              }}
              style={styles.image}
            />
          </ScrollView>
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
        </Panel>
        <TabHeader titles={["Tab 1", "Tab 2", "Tab 3"]} />
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
