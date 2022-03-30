import React from "react";

import TabListProvider from "../TabsListProvider";

export const TabList = ({ children }) => (
  <TabListProvider>{children}</TabListProvider>
);
