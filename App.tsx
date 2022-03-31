import { Image, StyleSheet, View, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TabContent, TabHeader, TabList } from "./src/components/rn-tab-list";

const { width, height } = Dimensions.get("screen");

console.log(width, height);

export default function App() {
  return (
    <View style={styles.container}>
      <TabList>
        <TabHeader
          titles={["long title", "title 2", "title 3"]}
          style={{
            marginTop: 180,
            backgroundColor: "#00000070",
            paddingVertical: 10,
          }}
        />
        <TabContent>
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
        </TabContent>
      </TabList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 100,
    // height: 100,
    backgroundColor: "dodgerblue",
    // alignItems: "center",
    // justifyContent: "center",
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
