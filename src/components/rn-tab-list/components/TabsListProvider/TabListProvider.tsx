import React, { createContext, FC, useState } from "react";
import Animated from "react-native-reanimated";

export type ITabListContext = {
  titles: string[];
  minPosition: number;
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

export const TabListProvider: FC = ({ children }) => {
  const [state, setState] = useState<ITabListContext>({
    titles: [] as string[],
    minPosition: 0,
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
