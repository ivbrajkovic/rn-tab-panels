import { Children, FC, useCallback, useEffect } from "react";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import PanelContentWrapper from "../PanelContentWrapper";
import useUserRenderCount, { useTabListSetContext } from "../../hooks";

const { width: screenWidth } = Dimensions.get("screen");

const CHANGE_INDEX_THRESHOLD = screenWidth * 0.2;

export interface IPanel {
  children: React.ReactNode;
  changeThreshold?: number;
  onIndexChange: (index: number) => void;
}

export const Panel: FC<IPanel> = ({
  changeThreshold = CHANGE_INDEX_THRESHOLD,
  onIndexChange,
  children,
}) => {
  useUserRenderCount("Panel");

  const setContext = useTabListSetContext();
  const childrenArray = Children.toArray(children);

  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const minPositionX = -childrenArray.length * screenWidth + screenWidth;
  const maxPositionX = 0;

  const setActiveIndex = useCallback((index: number) => {
    "worklet";
    const distance = Math.abs(index - currentIndex.value);
    currentIndex.value = index;
    translateX.value = withTiming(-index * screenWidth, {
      easing: Easing.out(Easing.ease),
      duration: distance * 500,
    });
  }, []);

  useEffect(() => {
    setContext({
      currentIndex,
      translateX,
      setActiveIndex,
    });
  }, []);

  const panGesture = Gesture.Pan()
    .onChange(({ changeX }) => {
      "worklet";
      const x = (translateX.value += changeX);
      translateX.value =
        x < minPositionX ? minPositionX : x > maxPositionX ? maxPositionX : x;
    })
    .onEnd(({ translationX }) => {
      // Get swipe direction
      const direction = translationX < 0 ? 1 : -1;

      // Do nothing if on the edge
      if (direction === 1 && translateX.value === minPositionX) return;
      else if (direction === -1 && translateX.value === maxPositionX) return;

      // Snap back to the center if lower than change threshold
      if (Math.abs(translationX) > changeThreshold) {
        currentIndex.value = currentIndex.value + 1 * direction;
        if (typeof onIndexChange === "function")
          runOnJS(onIndexChange)(currentIndex.value);
      }

      // Snap to next position
      translateX.value = withTiming(-currentIndex.value * screenWidth, {
        easing: Easing.out(Easing.ease),
      });
    });

  return (
    <GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject }}>
          {childrenArray.map((child, index) => {
            return (
              <PanelContentWrapper
                key={index}
                index={index}
                position={translateX}
              >
                {child}
              </PanelContentWrapper>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
