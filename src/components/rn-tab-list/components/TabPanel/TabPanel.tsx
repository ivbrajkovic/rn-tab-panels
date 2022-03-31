import { Children, FC, useEffect } from "react";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  useWorkletCallback,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import TabPanelContent from "../TabPanelContent";
import useUserRenderCount, { useTabListSetContext } from "../../hooks";
import {
  CHANGE_INDEX_THRESHOLD,
  MAX_POSITION,
  SCREEN_WIDTH,
} from "../constant";

export interface ITabPanel {
  changeThreshold?: number;
  headerStyle?: ViewStyle;
  onIndexChange?: (index: number) => void;
}

export const TabPanel: FC<ITabPanel> = ({
  changeThreshold = CHANGE_INDEX_THRESHOLD,
  onIndexChange,
  children,
}) => {
  useUserRenderCount("Panel");

  const childrenArr = Children.toArray(children);
  const minPosition = -childrenArr.length * SCREEN_WIDTH + SCREEN_WIDTH;

  const setContext = useTabListSetContext();

  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const setActiveIndex = useWorkletCallback((index: number) => {
    const distance = Math.abs(index - currentIndex.value);
    currentIndex.value = index;
    translateX.value = withTiming(-index * SCREEN_WIDTH, {
      easing: Easing.out(Easing.ease),
      duration: distance * 500,
    });
  }, []);

  useEffect(() => {
    setContext({
      translateX,
      currentIndex,
      setActiveIndex,
    });
  }, []);

  const panGesture = Gesture.Pan()
    .onChange(({ changeX }) => {
      "worklet";
      const x = (translateX.value += changeX);
      translateX.value =
        x < minPosition ? minPosition : x > MAX_POSITION ? MAX_POSITION : x;
    })
    .onEnd(({ translationX }) => {
      // Get swipe direction
      const direction = translationX < 0 ? 1 : -1;

      // Do nothing if on the edge
      if (direction === 1 && translateX.value === minPosition) return;
      else if (direction === -1 && translateX.value === MAX_POSITION) return;

      // Snap back to the center if lower than change threshold
      if (Math.abs(translationX) > SCREEN_WIDTH * changeThreshold) {
        currentIndex.value = currentIndex.value + 1 * direction;
        if (typeof onIndexChange === "function")
          runOnJS(onIndexChange)(currentIndex.value);
      }

      // Snap to next position
      translateX.value = withTiming(-currentIndex.value * SCREEN_WIDTH, {
        easing: Easing.out(Easing.ease),
      });
    });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          {childrenArr.map((child, index) => (
            <TabPanelContent key={index} index={index}>
              {child}
            </TabPanelContent>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
