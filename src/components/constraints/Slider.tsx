import React, { MouseEventHandler, useState, useEffect } from "react";
import Line from "../shapes/Line";
import { SPoint } from "../points/SPoint";

import { Circle1P } from "../shapes/Circle1P";
import { Circle3P } from "../shapes/Circle3P";
import Angle from "../shapes/Angle";
import Crosshair from "../shapes/Crosshair";

type Props = {
  imageURL: string;
  sPoints: point[];
  handleSPointChange: Function;
  //   handleSPointsChange: Function;
  shapes: shape[];
};

export const Slider: React.FC<Props> = ({
  imageURL,
  sPoints,
  handleSPointChange,
  //   handleSPointsChange,
  shapes,
}) => {
  //----- States for handling mouseDown Event for points and selected point in Point Component -----
  const [mouseDownS, setMouseDownS] = useState<boolean>(false);
  const [selectedIdxS, setSelectedIdxS] = useState<number>(-1);

  //----- Handle mouseUp Event from SVG Element for FPpoints -----
  const handleMouseUpS: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    setMouseDownS(false);
  };

  //----- Handle the mouseMove event to update x, y position of points (using offset) for Points and FPpoints -----
  const handleMouseMoveS: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    if (mouseDownS && selectedIdxS !== -1) {
      // Update the circle's position
      const newX = e.clientX - currentTargetRect.left;
      const newY = e.clientY - currentTargetRect.top;
      handleSPointChange(selectedIdxS, newX, newY);

      if (selectedIdxS === 4) {
        const k =
          ((B.y - A.y) * (E.x - A.x) - (B.x - A.x) * (E.y - A.y)) /
          (Math.pow(B.y - A.y, 2) + Math.pow(B.x - A.x, 2));
        // Calc position of intersection point M of AB and perpendicular line from E
        const Mx = E.x - k * (B.y - A.y);
        const My = E.y + k * (B.x - A.x);
        const AM = [Mx - A.x, My - A.y];
        const MB = [B.x - Mx, B.y - My];
        const LAM = Math.pow(Mx - A.x, 2) + Math.pow(My - A.y, 2);
        const LMB = Math.pow(B.x - Mx, 2) + Math.pow(B.y - My, 2);
        // Determine the P/M of Scalar product of AN and MB
        const scalarProduct = (Mx - A.x) * (B.x - Mx) + (My - A.y) * (B.y - My);
        if (scalarProduct > 0) {
          handleSPointChange(selectedIdxS, Mx, My);
        } else if (LAM < LMB) {
          handleSPointChange(selectedIdxS, A.x, A.y);
        } else {
          handleSPointChange(selectedIdxS, B.x, B.y);
        }
      }
    }
  };

  const [A, B, C, D, E] = sPoints;

  // Set SVG Style
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
          onMouseMove={handleMouseMoveS}
          onMouseUp={handleMouseUpS}
        >
          {/* ----- SHAPES ----- */}
          <Circle3P points={sPoints} />
          <Circle1P
            point={sPoints[2]}
            radius={shapes[1].radius}
            color={shapes[1].color}
          />
          <Crosshair
            point={sPoints[0]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Crosshair
            point={sPoints[1]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Crosshair
            point={sPoints[2]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Line
            start={sPoints[0]}
            end={sPoints[3]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={sPoints[1]}
            end={sPoints[3]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={sPoints[0]}
            end={sPoints[4]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={sPoints[1]}
            end={sPoints[4]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Angle
            pivot={sPoints[3]}
            ref1={sPoints[0]}
            ref2={sPoints[1]}
            radius={shapes[4].radius}
          />
          {sPoints.map((sPoint, index) => (
            <SPoint
              key={index}
              x={sPoint.x}
              y={sPoint.y}
              color={sPoint.color}
              label={sPoint.label}
              handleMouseDownS={() => {
                setMouseDownS(true);
                setSelectedIdxS(index);
              }}
            />
          ))}
        </svg>
      </div>
    </>
  );
};
