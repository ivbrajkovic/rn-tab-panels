import type { FC } from "react";
import React from "react";
import { View } from "react-native";
import TabLink from "../TabLink";

export interface ITabHeader {
  titles: string[];
}

const TabHeader: FC<ITabHeader> = ({ titles }) => {
  return (
    <View>
      {titles.map((title, index) => (
        <TabLink key={index} index={index} title={title} />
      ))}
    </View>
  );
};

export { TabHeader };
