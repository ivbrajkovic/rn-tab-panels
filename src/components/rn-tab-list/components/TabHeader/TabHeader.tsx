import type { FC } from "react";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTabListContext } from "../../hooks";
import TabLink from "../TabLink";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import Animated from "react-native-reanimated";

export interface ITabHeader {
  titles: string[];
}

const TabHeader: FC<ITabHeader> = ({ titles }) => {
  const { setActiveIndex } = useTabListContext();
  const singleTap = Gesture.Tap().onStart(() => {
    console.log("Single tap!");
  });

  return (
    <GestureHandlerRootView style={styles.headerContainer}>
      {titles.map((title, index) => (
        <GestureDetector
          key={index}
          gesture={Gesture.Tap().onStart(() => {
            setActiveIndex(index);
          })}
          // onPress={() => {
          //   setActiveIndex(index);
          // }}
          // style={{ backgroundColor: "#fff", height: 200 }}
        >
          <TabLink index={index} title={title} />
        </GestureDetector>
      ))}
    </GestureHandlerRootView>
  );
};

export { TabHeader };

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
