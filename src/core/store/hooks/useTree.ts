import { useContext } from "react";
import { TreeContex } from "../TreeProvider";
import {
  arrayFlatter,
  findNodeByKeyFromTree,
  genrateNewKey,
  isKeyExist,
  isLeaf,
  searchTree,
} from "../functions";
import { NodeType } from "../../types/types";

const treeHelpers = (tree: NodeType[]) => {
  // This function provides convenient access to tree functions && for make easier access to the functions below
  return {
    isLeaf,
    findNodeByKeyFromTree: (nodeKey: NodeType["key"]) =>
      findNodeByKeyFromTree(tree, nodeKey),
    genrateNewKey,
    searchTree: (searchTerm: string) => searchTree(tree, searchTerm),
    arrayFlatter: (array: NodeType[] | string[]) =>
      arrayFlatter(tree, array, false),
    isKeyExist: (key: string) => isKeyExist(tree, key),
  };
};
const useTree = () => {
  // Get the tree data from the context and create the treeHelpers function.
  const context = useContext(TreeContex);
  if (context === null) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  const { treeData } = context;
  const Helper = treeHelpers(treeData);
  return { ...context, Helper };
};
export { useTree };
