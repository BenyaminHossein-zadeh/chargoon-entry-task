import React, { createContext, useState } from "react";
import { NodeType } from "../types/types";
import { deleteLeafFromTree, findNodeByKeyFromTree } from "./functions";

export interface AppContextInterface {
  treeData: NodeType[];
  setTreeData: (tree: NodeType[]) => void;
  selectedNode: NodeType | undefined;
  setSelectedNode: (node?: NodeType) => void;
  deleteLeaf: (node: NodeType) => void;
  appendNode: (node: NodeType) => void;
}

const TreeContex = createContext<AppContextInterface>(null);

const TreeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [treeData, setTreeData] = useState<NodeType[]>([]);
  const [selectedNode, setSelectedNodeData] = useState<NodeType | undefined>();

  const deleteLeaf = (node: NodeType) => {
    // delete the leaf node from the tree & update the tree
    const newTree = structuredClone(treeData);
    deleteLeafFromTree(newTree, node);
    setTreeData(newTree);
  };

  // generate the hierarchy for a node
  // if the parent node does not have a hierarchy array(it means if the the parent node is the first child ), create one with the parent node's key
  // if the parent node already has a hierarchy array, append the child key to it
  const genrateHierarchy = (parent: NodeType, childKey: string) => {
    let hierarchy = [];
    if (parent.hierarchy && parent.hierarchy.length !== 0) {
      hierarchy = [...parent.hierarchy];
    } else {
      hierarchy.push(parent.key);
    }
    hierarchy.push(childKey);
    return hierarchy;
  };
  const appendNode = (node: NodeType) => {
    // append the node to the tree & update the tree
    const newTree = structuredClone(treeData);

    const parentNode = findNodeByKeyFromTree(newTree, node.parentKey);
    // update the parent node's children array if the node already exists in the parent's children array
    if (parentNode) {
      const oldNodeIndex = parentNode.children.findIndex(
        (child) => child.key === node.key
      );
      // if the node already exists in the parent's children array, update it
      if (oldNodeIndex >= 0) {
        parentNode.children[oldNodeIndex] = node;
      } else {
        node.hierarchy = genrateHierarchy(parentNode, node.key);
        parentNode.children.push(node);
      }
    }
    // if the parent node is not the first child, update the parent node's hierarchy array
    else if (!node.parentKey) {
      const oldNodeIndex = treeData.findIndex(
        (child) => child.key === node.key
      );
      if (oldNodeIndex >= 0) {
        newTree[oldNodeIndex] = node;
      }
      node.hierarchy = [node.key];
    }

    setTreeData(newTree);
  };

  const setSelectedNode = (node: NodeType) => {
    // update the selected node
    setSelectedNodeData(structuredClone(node));
  };
  const value = {
    treeData,
    setTreeData,
    selectedNode,
    setSelectedNode,
    deleteLeaf,
    appendNode,
  };

  return <TreeContex.Provider value={value}>{children}</TreeContex.Provider>;
};
export { TreeProvider, TreeContex };
