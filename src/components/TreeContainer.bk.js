import clone from "clone";
import React from "react";
import Tree from "react-tree-graph";
import { useWindowDimensions } from "../hooks/useWIndowDimensions";

const TreeContainer = ({ data, activeNode, setActiveNode, filter }) => {
  const { width, height } = useWindowDimensions();

  const handleClick = (event, node) => {
    console.log("select Node", node);
    setActiveNode(node);
  };

  const getRoot = (json) => {
    if (json.id === activeNode) {
      return json;
    }
    for (let i = 0; i < json.children.length; i++) {
      let childJson = getRoot(json.children[i]);
      if (childJson) {
        return childJson;
      }
    }
    return false;
  };

  const buildSubTree = (root) => {
    let newChildren = [];

    for (let i = 0; i < root.children.length; i++) {
      let child = buildSubTree(root.children[i]);
      if (child) {
        newChildren.push(child);
      }
    }

    if (newChildren.length > 0) {
      root.children = newChildren;
    }

    if (newChildren.length > 0 || root.name.toLowerCase() === filter) {
      return root;
    }
    return null;
  };

  const setClassName = (node) => {
    node.children.forEach(setClassName, this);

    if (!filter) {
      return;
    }

    node.className =
      node.name.toLowerCase().indexOf(filter) === -1
        ? "node searchExcluded"
        : "node searchIncluded";
  };

  let root = activeNode ? getRoot(data) : data;
  root = clone(root);

  if (filter) {
    root = buildSubTree(root) || root;
  }

  setClassName(root);

  return (
    <div style={{ overflow: "hidden" }}>
      <Tree
        animated
        data={root}
        keyProp="id"
        height={height - 60}
        width={width}
        gProps={{
          className: "node",
          onClick: handleClick,
        }}
        textProps={{
          dy: 3.5,
        }}
        steps={30}
      />
    </div>
  );
};

export default TreeContainer;
