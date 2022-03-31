import React, { createContext, FC, useState } from "react";
import Animated from "react-native-reanimated";

export type ITabListContext = {
  translateX: Animated.SharedValue<number> | null;
  currentIndex: Animated.SharedValue<number> | null;
  setActiveIndex: (index: number) => void;
};

export type ITabListSetContext = React.Dispatch<
  React.SetStateAction<ITabListContext>
>;

export const TabListSetContext = createContext<ITabListSetContext>(() => {});
export const TabListContext = createContext<ITabListContext | undefined>(
  undefined,
);

export const TabList: FC = ({ children }) => {
  const [state, setState] = useState<ITabListContext>({
    translateX: null,
    currentIndex: null,
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
