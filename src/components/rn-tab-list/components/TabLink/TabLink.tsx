import { FC, memo } from "react";
import React from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";

import useUserRenderCount from "../../hooks";

export interface ITabLink {
  title: string;
  onLayout: (event: LayoutChangeEvent) => void;
}

const TabLink: FC<ITabLink> = memo(({ title, onLayout }) => {
  useUserRenderCount("TabLink " + title);

  return (
    <View onLayout={onLayout}>
      <Text style={styles.linkText}>{title}</Text>
    </View>
  );
});

export default TabLink;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 32,
    color: "#fff",
  },
});
