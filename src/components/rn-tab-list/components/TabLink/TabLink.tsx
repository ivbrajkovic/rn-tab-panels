import { Children, FC } from "react";
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

export interface ITabLink {
  title: string;
}

export const TabLink: FC<ITabLink> = ({ title }) => {
  return (
    <View style={{ backgroundColor: "#ff0000" }}>
      <Text style={{ fontSize: 32, color: "#fff" }}>{title}</Text>
    </View>
  );
};
