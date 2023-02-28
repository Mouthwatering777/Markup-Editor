import { url } from "inspector";
import React, { FC, MouseEventHandler, useState } from "react";

//Import point
import { Point } from "./points/Point";

//Import shapes
import { Circle1P } from "./shapes/Circle1P";
import { Circle3P } from "./shapes/Circle3P";
import Crosshair from "./shapes/Crosshair";
import Line from "./shapes/Line";
import Angle from "./shapes/Angle";

//----- Import Constraints -----
// import { constraint } from "../App";
// import { FpPoint } from "./fp/FpPoint";
// import { Perpendicular } from "./constraints/Perpendicular";

type Props = {
  imageURL: string;
  points: point[];
  handlePointChange: Function;
  shapes: shape[];
  // constraints: constraint[];
};

// ------------- MAIN COMPONENT ---------------
export const MyEditorComponent: FC<Props> = ({
  imageURL,
  points,
  handlePointChange,
  shapes,
  // constraints,
}) => {
  // console.log(process.env.PUBLIC_URL);

  //----- States for handling mouseDown Event for points and selected point in Point Component -----
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  //----- Handle mouseUp Event from SVG Element for Points and FPpoints -----
  const handleMouseUp: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    setMouseDown(false);
  };

  //----- Handle the mouseMove event to update x, y position of points (using offset) for Points and FPpoints -----
  const handleMouseMove: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();
    if (mouseDown && selectedIdx !== -1) {
      // Update the circle's position
      handlePointChange(
        selectedIdx,
        e.clientX - currentTargetRect.left,
        e.clientY - currentTargetRect.top
      );
    }
  };

  const svgDivStyle = {
    // flex: "1",
    width: "100rem",
    color: "white",
    backgroundColor: "Darkblue",
    padding: "0.01rem",
    fontFamily: "Arial",
    backgroundImage: `url(${imageURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  // ----- Render SVG Elements -----
  return (
    <>
      <div className="Home">
        <div>
          <a href="/">Home</a>
        </div>
        <div>
          <a href="/FC">Forced Perpendicularity</a>
        </div>
        <div>
          <a href="/Slider">Slider</a>
        </div>
      </div>
      <div style={svgDivStyle}>
        <svg
          height="1000"
          width="1500"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* <rect
          width="750"
          height="1000"
          stroke="red"
          fill="transparent"
          stroke-width="2"
        /> */}

          {/* ----- SHAPES ----- */}
          <Circle3P points={points} />
          <Circle1P
            point={points[1]}
            radius={shapes[1].radius}
            color={shapes[1].color}
          />
          <Circle1P
            point={points[2]}
            radius={shapes[1].radius}
            color={shapes[1].color}
          />
          <Crosshair
            point={points[1]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Crosshair
            point={points[2]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Line
            start={points[0]}
            end={points[1]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={points[1]}
            end={points[2]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={points[2]}
            end={points[0]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={points[0]}
            end={points[3]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Angle
            pivot={points[0]}
            ref1={points[1]}
            ref2={points[2]}
            radius={shapes[4].radius}
          />

          {/* ----- POINTS ----- */}
          {points.map((point, index) => (
            <Point
              key={index}
              x={point.x}
              y={point.y}
              color={point.color}
              label={point.label}
              handleMouseDown={() => {
                setMouseDown(true);
                setSelectedIdx(index);
              }}
            />
          ))}
        </svg>
      </div>
    </>
  );
};
