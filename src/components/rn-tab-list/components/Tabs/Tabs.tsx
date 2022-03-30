import React, { FC } from "react";

import TabListProvider from "../TabsListProvider";

export const Tabs: FC = ({ children }) => (
  <TabListProvider>{children}</TabListProvider>
);
