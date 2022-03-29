import { Children, FC } from "react";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
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
const { width, height } = Dimensions.get("screen");

export interface ITabs {
  children: React.ReactNode;
}

const TabItemWrapper: FC = ({ index, position, children }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const totalItemOffset = index * width + position.value;

    const translateX = interpolate(
      totalItemOffset,
      [0, width],
      [0, width],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(totalItemOffset, [-200, 0, 200], [0.75, 1, 1]);
    const opacity = interpolate(totalItemOffset, [-600, 0, 200], [0, 1, 0]);

    return { opacity, transform: [{ translateX: translateX }, { scale }] };
  });
  // return <View style={{ ...StyleSheet.absoluteFillObject }}></View>;
  return (
    <Animated.View style={[styles.tab, { zIndex: index }, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const Tabs: FC<ITabs> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const translateX = useSharedValue(0);

  const context = useSharedValue(0);

  const panGesture = Gesture.Pan().onChange(({ changeX }) => {
    "worklet";
    translateX.value += changeX;

    // if (onLeft.value) {
    //   position.value = e.translationX;
    // } else {
    //   position.value = END_POSITION + e.translationX;
    // }
  });
  // .onEnd((e) => {
  //   if (translateX.value > END_POSITION / 2) {
  //     translateX.value = withTiming(END_POSITION, { duration: 100 });
  //     onLeft.value = false;
  //   } else {
  //     translateX.value = withTiming(0, { duration: 100 });
  //     onLeft.value = true;
  //   }
  // });

  return (
    <GestureHandlerRootView style={{ ...StyleSheet.absoluteFillObject }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={{ ...StyleSheet.absoluteFillObject }}>
          {childrenArray.map((child, index) => {
            return (
              <TabItemWrapper key={index} index={index} position={translateX}>
                {child}
              </TabItemWrapper>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export { Tabs };

const styles = StyleSheet.create({
  tab: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ff000040",
  },
});
