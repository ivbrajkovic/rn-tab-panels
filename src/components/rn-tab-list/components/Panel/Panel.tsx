import { Children, FC, useEffect, useRef } from "react";
import React from "react";
import { StyleSheet } from "react-native";
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
import PanelContentWrapper from "../PanelContentWrapper";
import useUserRenderCount, { useTabListSetContext } from "../../hooks";
import {
  CHANGE_INDEX_THRESHOLD,
  MAX_POSITION,
  SCREEN_WIDTH,
} from "../constant";

export interface IPanel {
  changeThreshold?: number;
  onIndexChange?: (index: number) => void;
  children: FC<{ title: string }>;
}

export const Panel: FC<IPanel> = ({
  changeThreshold = CHANGE_INDEX_THRESHOLD,
  onIndexChange,
  children,
}) => {
  useUserRenderCount("Panel");

  const setContext = useTabListSetContext();

  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const childrenArr = Children.toArray(children);
  const titles: string[] = childrenArr.map(
    (child, index) => child.props.title || index.toString(),
  );

  const setActiveIndex = useWorkletCallback((index: number) => {
    "worklet";
    const distance = Math.abs(index - currentIndex.value);
    currentIndex.value = index;
    translateX.value = withTiming(-index * SCREEN_WIDTH, {
      easing: Easing.out(Easing.ease),
      duration: distance * 500,
    });
  }, []);

  const minPositionRef = useRef(
    -childrenArr.length * SCREEN_WIDTH + SCREEN_WIDTH,
  );

  useEffect(() => {
    setContext({
      titles,
      translateX,
      currentIndex,
      setActiveIndex,
      minPosition: minPositionRef.current,
    });
  }, []);

  const panGesture = Gesture.Pan()
    .onChange(({ changeX }) => {
      "worklet";
      const x = (translateX.value += changeX);
      translateX.value =
        x < minPositionRef.current
          ? minPositionRef.current
          : x > MAX_POSITION
          ? MAX_POSITION
          : x;
    })
    .onEnd(({ translationX }) => {
      // Get swipe direction
      const direction = translationX < 0 ? 1 : -1;

      // Do nothing if on the edge
      if (direction === 1 && translateX.value === minPositionRef.current)
        return;
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
    <GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={StyleSheet.absoluteFillObject}>
          {childrenArr.map((child, index) => (
            <PanelContentWrapper
              key={index}
              index={index}
              position={translateX}
            >
              {child}
            </PanelContentWrapper>
          ))}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
