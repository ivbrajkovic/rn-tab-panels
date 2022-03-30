import React, { useState } from "react";
import { TabListContext, TabListSetContext } from "../../context";

export const TabListProvider = ({ children }) => {
  const [state, setState] = useState({});
  return (
    <TabListSetContext.Provider value={setState}>
      <TabListContext.Provider value={state}>
        {children}
      </TabListContext.Provider>
    </TabListSetContext.Provider>
  );
};
