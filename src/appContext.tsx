import React from "react";
import { NodeType } from "./core/types/types";

interface AppContext {
  updateTreeData: (nodes: NodeType[]) => void;
  treeData: NodeType[];
}

const defaultAppContext: AppContext = {
  treeData: [],
  updateTreeData: () => [],
};

const AppContext = React.createContext<AppContext>(defaultAppContext);

export default AppContext;
