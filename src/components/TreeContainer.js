import clone from "clone";
import React from "react";
import Tree from "react-d3-tree";
import { useWindowDimensions } from "../hooks/useWIndowDimensions";
import { useCenteredTree } from "../hooks/useCenterdTree";

const TreeContainer = ({ data, activeNode, setActiveNode, filter }) => {
  const [translate, containerRef] = useCenteredTree();
  const { width, height } = useWindowDimensions();

  const nodeSize = {
    x: Math.max(120, width / 10),
    y: Math.max(10, height / 40),
  };

  const handleClick = (node) => {
    setActiveNode(node.id);
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

    if (
      newChildren.length > 0 ||
      root.name.toLowerCase() === filter.toLowerCase()
    ) {
      return root;
    }
    return null;
  };

  let root = activeNode ? getRoot(data) : data;
  root = clone(root);

  if (filter) {
    root = buildSubTree(root) || root;
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={containerRef}>
      <Tree
        data={root}
        translate={translate}
        nodeSize={nodeSize}
        collapsible={false}
        onNodeClick={handleClick}
        branchNodeClassName="node"
        leafNodeClassName="node"
        rootNodeClassName="node"
        pathClassFunc={() => "link"}
        renderCustomNodeElement={(rd3tProps) =>
          renderRectSvgNode({ ...rd3tProps, handleClick })
        }
      />
    </div>
  );
};

const renderRectSvgNode = ({ nodeDatum, handleClick }) => (
  <g>
    <circle onClick={() => handleClick(nodeDatum)} />
    <text dy={3.5} x={10}>
      {nodeDatum.name}
    </text>
  </g>
);

export default TreeContainer;
