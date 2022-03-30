import React from "react";

import TabListProvider from "../TabsListProvider";

export const Tabs = ({ children }) => (
  <TabListProvider>{children}</TabListProvider>
);
