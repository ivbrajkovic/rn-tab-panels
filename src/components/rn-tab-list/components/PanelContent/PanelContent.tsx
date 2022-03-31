import { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTabListContext } from "../../hooks";
import { SCREEN_WIDTH } from "../constant";

export interface IPanel {
  index: number;
}

export const PanelContent: FC<IPanel> = ({ index, children }) => {
  const { translateX: currentTranslateX } = useTabListContext();

  const animatedStyle = useAnimatedStyle(() => {
    if (!currentTranslateX) return {};

    const totalItemOffset = index * SCREEN_WIDTH + currentTranslateX.value;

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
    <Animated.View style={[styles.tab, { zIndex: index }, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tab: {
    ...StyleSheet.absoluteFillObject,
  },
});
