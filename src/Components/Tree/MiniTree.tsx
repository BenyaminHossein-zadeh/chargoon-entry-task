import React from "react";
import { Tree } from "antd";
import { NodeType } from "../../core/types/types";
import { useTree } from "../../core/store/hooks/useTree";

interface Props {
  node: NodeType;
}

const MiniTree: React.FC<Props> = ({ node }) => {
  const {
    Helper: { findNodeByKeyFromTree },
  } = useTree();
  const generateTreeData = (node: NodeType): NodeType[] => {
    const treeData: NodeType[] = [];
    node.hierarchy.forEach((key) => {
      const parentNode = findNodeByKeyFromTree(key);
      if (parentNode) {
        treeData.push(parentNode);
      }
    });
    return treeData;
  };

  const treeData = generateTreeData(node);

  return (
    <Tree
      treeData={treeData.map((n) => ({
        title: n.title,
        key: n.key,
        children: [] as NodeType[],
      }))}
      defaultExpandAll
    />
  );
};
export default MiniTree;
