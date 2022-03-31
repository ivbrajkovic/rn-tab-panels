import { useEffect, useRef, useContext } from "react";
import {
  TabListContext,
  TabListSetContext,
} from "../components/TabListProvider";

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

export default function useUserRenderCount(name: string) {
  const countRef = useRef(0);
  useEffect(() => {
    console.log(`${name} rendered ${++countRef.current} times.`);
  });
  useEffect(() => {
    return () => {
      console.log(`${name} unmounted.`);
    };
  }, []);
}
