import { useEffect, useState } from "react";

import Form from "./Components/Form";
import Sidebar from "./Components/Sidebar";
import ExtendedTree from "./Components/Tree";
import { getNodes } from "./core/services/transportLayer";
import { FormSubmitType, NodeType } from "./core/types/types";
import { useTree } from "./core/store/hooks/useTree";

function App() {
  const [clipboard, setClipboard] = useState<NodeType | null>(null);
  const {
    treeData,
    setTreeData,
    selectedNode,
    setSelectedNode,
    appendNode,
    deleteLeaf,
    Helper: { genrateNewKey },
  } = useTree();

  const fetchTreeData = async () => {
    // fetch tree data from MockData and save in the context
    const result = await getNodes();
    setTreeData(result);
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  const mekeNewbranchNode = (node: NodeType): NodeType => {
    // create a new branch node under the selected node
    const key = genrateNewKey(treeData);
    const title = node.title + "-زیر شاخه";
    const parentKey = node.key;
    const newNode: NodeType = {
      accesses: [],
      hierarchy: [],
      key,
      title,
      users: [],
      children: [],
      parentKey,
    };
    return newNode;
  };

  const handleContextMenuClick = (actionKey: any, node: NodeType) => {
    if (node) {
      switch (actionKey) {
        case "ACTION1":
          return () => {
            // for add a subnode
            setSelectedNode(mekeNewbranchNode(node));
          };
        case "ACTION2":
          return () => {
            // for cut and save to clipboard (clipboard is a state)
            setClipboard(node);
            deleteLeaf(node);
          };
        case "ACTION3":
          return () => {
            // for paste from clipboard (if clipboard is not null)
            if (clipboard) {
              clipboard.parentKey = node.key;
              appendNode(clipboard);
              setClipboard(null);
            }
          };
        case "ACTION4":
          return () => {
            // for delete the node if it is Leaf node
            deleteLeaf(node);
          };
      }
    }
  };

  const handleFormSubmit = (data: FormSubmitType) => {
    // for update node data (title, users, key) and append to the tree
    selectedNode.title = data.title;
    selectedNode.users = data.users;
    selectedNode.key = data.key;
    appendNode(selectedNode);
    setSelectedNode();
  };

  const handleUpdateAccess = (data: string[]) => {
    // for update node.accesses
    const cloneOfNode = structuredClone(selectedNode);
    if (cloneOfNode) {
      cloneOfNode.accesses = data;
    }
    appendNode(cloneOfNode);
  };

  return (
    <div className="App">
      <Sidebar>
        <ExtendedTree
          clipboard={clipboard}
          handleContextMenuClick={handleContextMenuClick}
        />
      </Sidebar>
      <Form
        onFormSubmit={handleFormSubmit}
        onUpdateAccess={handleUpdateAccess}
      />
    </div>
  );
}

export default App;
