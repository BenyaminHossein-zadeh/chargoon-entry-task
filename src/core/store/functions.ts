import { NodeType } from "../types/types";

// returns true if the node is a leaf node
function isLeaf(node: NodeType): boolean {
  return !node.children || node.children.length === 0;
}

// searches for a node by key in the tree and returns it if found, otherwise returns null
function findNodeByKeyFromTree(
  tree: NodeType[],
  nodeKey: NodeType["key"]
): NodeType | null {
  for (const node of tree) {
    if (node.key === nodeKey) {
      return node;
    }
    if (node.children) {
      const res = findNodeByKeyFromTree(node.children, nodeKey);
      if (res) {
        return res;
      }
    }
  }
  return null;
}

// deletes a leaf node from the tree and updates its parent node's children array accordingly
function deleteLeafFromTree(tree: NodeType[], node: NodeType): void {
  if (!isLeaf(node)) {
    return;
  }
  const parent = findNodeByKeyFromTree(tree, node.parentKey);
  //for case that root has no children
  if (!parent) {
    tree = tree.filter((child) => child.key !== node.key);
    return;
  }
  //for case that node is normal leaf
  parent.children = parent.children.filter(
    (child: NodeType) => child.key !== node.key
  );
  return;
}

// it's a callback function that generates a new unique key for a new node in the tree
function genrateNewKey(nodes: NodeType[]): string {
  let maxKey = -Infinity;

  const traverse = (nodeList: NodeType[]) => {
    for (const node of nodeList) {
      if (+node.key > maxKey) {
        maxKey = +node.key;
      }
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };
  traverse(nodes);

  return (maxKey + 1).toString();
}

// checks if a key already exists in the tree
function isKeyExist(tree: NodeType[], key: string): boolean {
  let isExist = false;
  const traverse = (nodeList: NodeType[]) => {
    for (const node of nodeList) {
      // check if the node exists in the tree or not
      if (node.key === key) {
        isExist = true;
      }
      //loop again for each node with child
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  };

  traverse(tree);
  return isExist;
}

//to returns a list of nodes that contain the search term in their title
function searchTree(tree: NodeType[], searchTerm: string): NodeType[] {
  const result: NodeType[] = [];

  function search(tree: NodeType[]) {
    for (const node of tree) {
      if (node.title.includes(searchTerm)) {
        //to collect all matches
        result.push(node);
      }
      if (node.children) {
        search(node.children);
      }
    }
  }
  search(tree);

  return result;
}

//to convert the tree data into a single flat array of nodes or keys based on the returnKeys flag
function arrayFlatter(
  treeData: NodeType[],
  array: NodeType[] | string[],
  returnKeys: boolean = false
): void {
  treeData.forEach((node) => {
    if (returnKeys) {
      (array as string[]).push(node.key);
    } else {
      (array as NodeType[]).push(node);
    }
    if (node.children && node.children.length > 0) {
      arrayFlatter(node.children, array, returnKeys);
    }
  });
}

export {
  isLeaf,
  findNodeByKeyFromTree,
  deleteLeafFromTree,
  genrateNewKey,
  searchTree,
  arrayFlatter,
  isKeyExist,
};
