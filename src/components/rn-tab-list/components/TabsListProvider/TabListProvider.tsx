import React, { createContext, Dispatch, FC, useState } from "react";
import Animated from "react-native-reanimated";

export type ITabListContext = {
  currentIndex: Animated.SharedValue<number> | null;
  translateX: Animated.SharedValue<number> | null;
  setActiveIndex: (index: number) => void;
};

export type ITabListSetContext = Dispatch<ITabListContext>;

export const TabListSetContext = createContext<ITabListSetContext>(() => {});
export const TabListContext = createContext<ITabListContext>({
  currentIndex: null,
  translateX: null,
  setActiveIndex: () => {},
});

export const TabListProvider: FC = ({ children }) => {
  const [state, setState] = useState<ITabListContext>({
    currentIndex: null,
    translateX: null,
    setActiveIndex: () => {
      throw new Error("setActiveIndex is not defined");
    },
  });
  return (
    <TabListSetContext.Provider value={setState}>
      <TabListContext.Provider value={state}>
        {children}
      </TabListContext.Provider>
    </TabListSetContext.Provider>
  );
};
