import React, { createContext, FC, useState } from "react";
import Animated from "react-native-reanimated";

export type ITabListContext = {
  titles: string[];
  minPosition?: number;
  translateX?: Animated.SharedValue<number>;
  currentIndex?: Animated.SharedValue<number>;
  setActiveIndex: (index: number) => void;
};

export type ITabListSetContext = React.Dispatch<
  React.SetStateAction<ITabListContext>
>;

export const TabListSetContext = createContext<ITabListSetContext>(() => {});
export const TabListContext = createContext<ITabListContext | undefined>(
  undefined,
);

export const TabListProvider: FC = ({ children }) => {
  const [state, setState] = useState({
    titles: [] as string[],
    setActiveIndex: (index: number) => {},
  });
  return (
    <TabListSetContext.Provider value={setState}>
      <TabListContext.Provider value={state}>
        {children}
      </TabListContext.Provider>
    </TabListSetContext.Provider>
  );
};
