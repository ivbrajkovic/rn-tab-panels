import { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("screen");

export interface IPanel {
  index: number;
  panelWidth?: number;
  position: Animated.SharedValue<number>;
  children: React.ReactNode;
}

export const PanelContentWrapper: FC<IPanel> = ({
  index,
  panelWidth = screenWidth,
  position,
  children,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const totalItemOffset = index * panelWidth + position.value;

    const translateX = interpolate(
      totalItemOffset,
      [0, panelWidth],
      [0, panelWidth],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(totalItemOffset, [-200, 0, 200], [0.75, 1, 1]);
    const opacity = interpolate(totalItemOffset, [-600, 0, 200], [0, 1, 0]);

    return { opacity, transform: [{ translateX: translateX }, { scale }] };
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
    backgroundColor: "#ff000040",
  },
});
