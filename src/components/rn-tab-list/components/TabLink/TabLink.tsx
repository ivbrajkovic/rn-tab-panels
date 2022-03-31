import { Children, FC, forwardRef, memo } from "react";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import useUserRenderCount, { useTabListContext } from "../../hooks";

export interface ITabLink {
  title: string;
}

const TabLink: FC<ITabLink> = forwardRef(({ title, onLayout }, ref) => {
  useUserRenderCount("TabLink " + title);
  // const { translateX } = useTabListContext();

  return (
    <View ref={ref} onLayout={onLayout} style={{ backgroundColor: "#ff0000" }}>
      <Text style={{ fontSize: 32, color: "#fff" }}>{title}</Text>
    </View>
  );
});

export default memo(TabLink);
