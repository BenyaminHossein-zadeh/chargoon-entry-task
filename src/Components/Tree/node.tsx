import React from "react";
import { NodeType } from "../../core/types/types";
import {
  ContextMenuTriggerEx,
  ContextMenuItemEx,
  ContextMenuEx,
} from "../ContextMenu";
import { useTree } from "../../core/store/hooks/useTree";

interface Props {
  node: NodeType;
  handleContextMenuClick: (actionKey: string, node: NodeType) => void;
  expandedKeys?: React.Key[];
  clipboard: NodeType | null;
  onClick: (node: NodeType) => void;
}
function Node({ node, handleContextMenuClick, clipboard, onClick }: Props) {
  const { Helper } = useTree();
  const { isLeaf } = Helper;
  return (
    <div>
      {/* NOTICE: id must be unique between EVERY <ContextMenuTrigger> and <ContextMenu> pair */}
      {/* NOTICE: inside the pair, <ContextMenuTrigger> and <ContextMenu> must have the same id */}
      <div
        onClick={(e) => {
          onClick(node);
        }}
      >
        <ContextMenuTriggerEx id={node.key} title={node.title} />
      </div>

      <ContextMenuEx id={node.key}>
        <ContextMenuItemEx
          handleClick={handleContextMenuClick("ACTION1", node)}
          title={"افزودن زیرشاخه"}
        />
        {isLeaf(node) ? (
          // if the node is a leaf or isnot a leaf show diffrent options
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION2", node)}
            title={"برش"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION2", node)}
            title={"برش"}
          />
        )}
        {clipboard ? (
          // if we have a node in clipboard the show paste option if there is nothing in the clipboard then disable it
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION3", node)}
            title={"چسباندن"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION3", node)}
            title={"چسباندن"}
          />
        )}

        {isLeaf(node) ? (
          // if the node is a leaf or isnot a leaf show diffrent options
          <ContextMenuItemEx
            handleClick={handleContextMenuClick("ACTION4", node)}
            title={"حذف"}
          />
        ) : (
          <ContextMenuItemEx
            disabled
            handleClick={handleContextMenuClick("ACTION4", node)}
            title={"حذف"}
          />
        )}
      </ContextMenuEx>
    </div>
  );
}
export default Node;
