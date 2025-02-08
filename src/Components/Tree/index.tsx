import { Input, Tree } from "antd";
import React, { useState } from "react";

import { NodeType } from "../../core/types/types";
import Node from "./node";
import SearchResult from "./searchResult";
import { useTree } from "../../core/store/hooks/useTree";

const { Search } = Input;

interface Props {
  handleContextMenuClick: (actionKey: any, node: NodeType) => () => void;
  clipboard: NodeType | null;
}

const TreeExtended: React.FC<Props> = ({
  handleContextMenuClick,
  clipboard,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [text, setText] = useState("");
  const {
    treeData,
    setSelectedNode,
    Helper: { arrayFlatter },
  } = useTree();
  const onExpand = (newExpandedKeys: any[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const titleRenderer = (node: NodeType) => {
    const onNodeClick = () => {
      setSelectedNode(node);
    };
    return (
      <Node
        clipboard={clipboard}
        node={node}
        handleContextMenuClick={handleContextMenuClick}
        onClick={onNodeClick}
      />
    );
  };

  const arr: NodeType[] = [];
  arrayFlatter(arr);

  return (
    <div className="tree-wrap">
      <Search
        value={text}
        style={{ marginBottom: 8 }}
        placeholder="جستجو"
        onChange={handleSearchInputChange}
      />
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        titleRender={titleRenderer}
      />
      {text.length !== 0 && (
        <SearchResult items={arr.filter((i) => i.title.includes(text))} />
      )}
    </div>
  );
};

export default TreeExtended;
