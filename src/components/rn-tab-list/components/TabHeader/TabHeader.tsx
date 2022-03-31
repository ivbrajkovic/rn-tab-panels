import { FC, useEffect, useRef, useState } from "react";
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
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SCREEN_WIDTH } from "../constant";

export interface ITabHeader {
  style?: ViewStyle;
}

type IUnderlineState = {
  isLoading: boolean;
  interpolateInput: number[];
  interpolatePosition: number[];
  interpolateWidth: number[];
};

const Underline: FC<IUnderlineState> = ({
  interpolateInput,
  interpolatePosition,
  interpolateWidth,
}) => {
  const { translateX } = useTabListContext();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1);
  }, []);

  const underlineStyle = useAnimatedStyle(() => {
    if (!translateX) return {};

    const x = interpolate(
      translateX.value,
      interpolateInput,
      interpolatePosition,
    );

    const width = interpolate(
      translateX.value,
      interpolateInput,
      interpolateWidth,
    );

    return {
      width,
      opacity: opacity.value,
      transform: [{ translateX: x }, { scale: 1.1 }],
    };
  }, []);

  return <Animated.View style={[styles.underline, underlineStyle]} />;
};

export const TabHeader: FC<ITabHeader> = ({ style }) => {
  useUserRenderCount("TabHeader");

  const { titles, minPosition, setActiveIndex } = useTabListContext();

  const [underlineState, setUnderlineState] = useState<IUnderlineState>({
    isLoading: true,
    interpolateInput: [],
    interpolatePosition: [],
    interpolateWidth: [],
  });

  const stateRef = useRef<{
    [key: number]: { positionX: number; width: number };
  }>({});

  const initiateUnderlineState = () => {
    setUnderlineState({
      isLoading: false,
      interpolateInput: titles.map((_, i) => minPosition + i * SCREEN_WIDTH),
      interpolatePosition: titles
        .map((_, i) => stateRef.current[i].positionX)
        .reverse(),
      interpolateWidth: titles
        .map((_, i) => stateRef.current[i].width)
        .reverse(),
    });
  };

  return (
    <View style={[styles.headerContainer, style]}>
      <GestureHandlerRootView style={styles.linksContainer}>
        {titles.map((title, index) => {
          const gesture = Gesture.Tap().onStart(() => {
            setActiveIndex(index);
          });
          const onLayout = (e: LayoutChangeEvent) => {
            const { x, width } = e.nativeEvent.layout;
            stateRef.current = {
              ...stateRef.current,
              [index]: { positionX: x, width },
            };
            if (Object.keys(stateRef.current).length === titles.length)
              initiateUnderlineState();
          };
          return (
            <GestureDetector key={index} gesture={gesture}>
              <TabLink title={title} onLayout={onLayout} />
            </GestureDetector>
          );
        })}
      </GestureHandlerRootView>
      {underlineState.isLoading ? null : <Underline {...underlineState} />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
    width: "100%",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  underline: {
    width: 0,
    height: 4,
    // opacity: 0,
    backgroundColor: "#fff",
  },
});
