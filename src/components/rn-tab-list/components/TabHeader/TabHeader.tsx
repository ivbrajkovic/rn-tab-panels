import { FC, useState } from "react";
import React from "react";
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from "react-native";
import useUserRenderCount, { useTabListContext } from "../../hooks";
import TabLink from "../TabLink";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../constant";

export interface ITabHeader {
  titles: string[];
  style?: ViewStyle;
}

const TabHeader: FC<ITabHeader> = ({ style }) => {
  useUserRenderCount("TabHeader");

  const {
    currentIndex,
    minPosition,
    setActiveIndex,
    titles = [],
    translateX,
  } = useTabListContext();

  const [state, setState] = useState<{
    [key: number]: { positionX: number; width: number };
  } | null>();

  const underlineStyle = useAnimatedStyle(() => {
    if (!state || !minPosition || !translateX) return { opacity: 0 };

    const input = titles.map((_, i) => minPosition + i * SCREEN_WIDTH);

    const outputPositionX = titles.map((_, i) => state[i].positionX).reverse();
    const x = interpolate(translateX.value, input, outputPositionX);

    const outputWidth = titles.map((_, i) => state[i].width).reverse();
    const width = interpolate(translateX.value, input, outputWidth);

    return {
      width,
      opacity: withTiming(1),
      transform: [{ translateX: x }],
    };
  }, [state]);

  if (!titles.length) return null;

  return (
    <View style={[styles.headerContainer, style]}>
      <GestureHandlerRootView style={styles.linksContainer}>
        {titles.map((title, index) => (
          <GestureDetector
            key={index}
            gesture={Gesture.Tap().onStart(() => {
              setActiveIndex(index);
            })}
          >
            <TabLink
              onLayout={(e: LayoutChangeEvent) => {
                const { x, width } = e.nativeEvent.layout;
                setState((prevState) => ({
                  ...prevState,
                  [index]: { positionX: x, width },
                }));
              }}
              index={index}
              title={title}
            />
          </GestureDetector>
        ))}
      </GestureHandlerRootView>
      <Animated.View
        style={[
          { height: 4, backgroundColor: "#fff", width: 0 },
          underlineStyle,
        ]}
      />
    </View>
  );
};

export { TabHeader };

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
    width: "100%",
  },

  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ff000070",
  },
});
