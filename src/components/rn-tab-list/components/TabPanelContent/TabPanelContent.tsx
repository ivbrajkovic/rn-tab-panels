import { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTabListContext } from "../../hooks";
import { SCREEN_WIDTH } from "../constant";

export interface ITabPanel {
  index: number;
}

export const TabPanelContent: FC<ITabPanel> = ({ index, children }) => {
  const { translateX: translationX } = useTabListContext();

  const animatedStyle = useAnimatedStyle(() => {
    if (!translationX) return {};

    const totalItemOffset = index * SCREEN_WIDTH + translationX.value;

    const translateX = interpolate(
      totalItemOffset,
      [0, SCREEN_WIDTH],
      [0, SCREEN_WIDTH],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(totalItemOffset, [-200, 0, 200], [0.75, 1, 1]);
    const opacity = interpolate(totalItemOffset, [-600, 0, 200], [0, 1, 0]);

    return { opacity, transform: [{ translateX }, { scale }] };
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { zIndex: index }, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};
