import React from "react";

type Props = {
  start: point;
  end: point;
  extendStart?: number;
  extendEnd?: number;
  arrowStart?: boolean;
  arrowEnd?: boolean;
  color: string;
  strokeSize: number;
};

const Line: React.FC<Props> = (Props) => {
  const {
    start,
    end,
    extendStart,
    extendEnd,
    arrowStart,
    arrowEnd,
    color,
    strokeSize,
  } = Props;

  // Extend Start

  //Calculate the difference vector between start and dnd
  let diffVector = [end.x - start.x, end.y - start.y];
  //Calculate the length of the difference vector
  let diffVectorLength = Math.sqrt(
    Math.pow(diffVector[0], 2) + Math.pow(diffVector[1], 2)
  );
  //Calculate the x, y coordinates of the new start point C
  let startX =
    start.x - ((extendStart || 0) * diffVector[0]) / diffVectorLength;
  let startY =
    start.y - ((extendStart || 0) * diffVector[1]) / diffVectorLength;

  //Extend End

  // Calculate the length of the line
  let lineLength = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  // Calculate the ratio of x and y
  let xRatio = (end.x - start.x) / lineLength;
  let yRatio = (end.y - start.y) / lineLength;

  // Calculate the new end point C
  let endX = end.x + (extendEnd || 0) * xRatio;
  let endY = end.y + (extendEnd || 0) * yRatio;

  let Style = {
    stroke: color,
    strokeWidth: strokeSize,
  };

  let markerStyle = {
    stroke: "black",
    fill: "black",
    strokeWidth: 30,
  };

  return (
    <>
      <defs>
        <marker
          id="startarrow"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
        >
          <polygon points="10 0, 10 7, 0 3.5" fill="black" />
        </marker>
        <marker
          id="endarrow"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>
      {arrowStart === true && (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          style={Style}
          markerStart="url(#startarrow)"
        ></line>
      )}
      {arrowEnd === true && (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          style={Style}
          markerEnd="url(#endarrow)"
        />
      )}
    </>
  );
};

export default Line;
