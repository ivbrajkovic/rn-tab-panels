import { useContext } from "react";
import { TabListContext, TabListSetContext } from "../context";

export const useTabListContext = () => {
  const context = useContext(TabListContext);
  if (context === undefined) {
    throw new Error(
      "useTabListContext hook must be used within a TabList component.",
    );
  }
  return context;
};

export const useTabListSetContext = () => {
  const context = useContext(TabListSetContext);
  if (context === undefined) {
    throw new Error(
      "useTabListSetContext hook must be used within a TabList component",
    );
  }
  return context;
};
