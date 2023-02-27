import React, { MouseEventHandler, useState, useEffect } from "react";
import { FpPoint } from "../points/FpPoint";
import Line from "../shapes/Line";
import { Circle1P } from "../shapes/Circle1P";
import { Circle3P } from "../shapes/Circle3P";
import Crosshair from "../shapes/Crosshair";
import Angle from "../shapes/Angle";

type Props = {
  imageURL: string;
  fpPoints: point[];
  handlefpPointChange: Function;
  shapes: shape[];
};

export const Perpendicular: React.FC<Props> = ({
  imageURL,
  fpPoints,
  handlefpPointChange,
  shapes,
}) => {
  //----- States for handling mouseDown Event for points and selected point in Point Component -----
  const [mouseDownfp, setMouseDownfp] = useState<boolean>(false);
  const [selectedIdxfp, setSelectedIdxfp] = useState<number>(-1);
  // const [mouseUpfp, setMouseUpfp] = useState<boolean>(true);

  //----- Handle mouseUp Event from SVG Element for FPpoints -----
  const handleMouseUpfp: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    setMouseDownfp(false);
  };

  //----- Handle the mouseMove event to update x, y position of points (using offset) for Points and FPpoints -----
  const handleMouseMovefp: MouseEventHandler<SVGElement> = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ): void => {
    let currentTargetRect = e.currentTarget.getBoundingClientRect();

    if (mouseDownfp && selectedIdxfp !== -1) {
      // Update the circle's position
      const newX = e.clientX - currentTargetRect.left;
      const newY = e.clientY - currentTargetRect.top;
      handlefpPointChange(selectedIdxfp, newX, newY);

      if (selectedIdxfp === 0 || selectedIdxfp === 3) {
        console.log("MainAxis Moving- A, D");
        handleMainAxisMove();
      } else if (selectedIdxfp === 1 || selectedIdxfp === 2) {
        console.log("SecondaryAxis Moving- B,C!!");
        handleSecondaryAxisMove();
      }
    }
  };

  const [A, B, C, D] = fpPoints;

  // useEffect(() => {
  //   if (mouseDownfp) {
  //     // console.log(selectedIdxfp);
  //     if (selectedIdxfp === 0 || selectedIdxfp === 3) {
  //       console.log("MainAxis Moving- A, D");
  //       handleMainAxisMove();
  //     } else if (selectedIdxfp === 1 || selectedIdxfp === 2) {
  //       console.log("SecondaryAxis Moving- B,C!!");
  //       handleSecondaryAxisMove();
  //     }
  //   }
  // }, [mouseDownfp]);

  //Define two functions to compute the angle between the two axis
  function computeAngle(axis1: Point[], axis2: Point[]): number {
    const [p1, p2] = axis1;
    const [p3, p4] = axis2;
    const deltaX = p2.x - p1.x;
    const deltaY = p2.y - p1.y;
    const angle1 = Math.atan2(deltaY, deltaX);
    const deltaX2 = p4.x - p3.x;
    const deltaY2 = p4.y - p3.y;
    const angle2 = Math.atan2(deltaY2, deltaX2);
    return Math.abs(angle2 - angle1);
  }

  function isAngle90Degrees(axis1: Point[], axis2: Point[]): boolean {
    const angle = computeAngle(axis1, axis2);
    return Math.abs(angle - Math.PI / 2) < 0.001;
  }

  // Calculte the intersection point of the two lines
  function getIntersection(mainAxis: Point[], secondaryAxis: Point[]): any {
    const [p1, p4] = mainAxis;
    const [p2, p3] = secondaryAxis;

    // Calculate coefficients of line equation
    const a1 = (p1.y - p4.y) / (p1.x - p4.x);
    const b1 = p1.y - ((p1.y - p4.y) * p1.x) / (p1.x - p4.x);

    const a2 = (p2.y - p3.y) / (p2.x - p3.x);
    const b2 = p2.y - ((p2.y - p3.y) * p2.x) / (p2.x - p3.x);

    if (a1 === a2) {
      return null;
    } else {
      const x = (b2 - b1) / (a1 - a2);
      const y = a1 * x + b1;
      return { x, y };
    }
  }

  //Define a function to rotate the secondaryAxis whenever the mainAxis is moved
  function rotateMainAxis(mainAxis: Point[], secondaryAxis: Point[]): void {
    const [A, D] = mainAxis;
    const [B, C] = secondaryAxis;
    // const angle = computeAngle(mainAxis, secondaryAxis);
    // const { x: Intx, y: Inty } = getIntersection(mainAxis, secondaryAxis);
    const px = C.x - B.x;
    const py = C.y - B.y;
    const dBC2 = px * px + py * py;
    const u = ((A.x - B.x) * px + (A.y - B.y) * py) / dBC2;
    const Ox = B.x + u * px;
    const Oy = B.y + u * py;

    const qx = D.x - A.x;
    const qy = D.y - A.y;
    const dAD2 = Math.sqrt(qx * qx + qy * qy);
    const v = Math.pow(Ox - A.x, 2) + Math.pow(Oy - A.y, 2);
    const t = dAD2 / Math.sqrt(v);

    const Dx = A.x + t * (Ox - A.x);
    const Dy = A.y + t * (Oy - A.y);

    handlefpPointChange(3, Dx, Dy);
  }

  //Define a function to rotate the secondaryAxis whenever the mainAxis is moved
  function rotateSecondaryAxis(
    mainAxis: Point[],
    secondaryAxis: Point[]
  ): void {
    const [A, D] = mainAxis;
    const [B, C] = secondaryAxis;
    // const angle = computeAngle(mainAxis, secondaryAxis);
    // const { x: Intx, y: Inty } = getIntersection(mainAxis, secondaryAxis);
    const px = D.x - A.x;
    const py = D.y - A.y;
    const dAD = px * px + py * py;
    const u = ((B.x - A.x) * px + (B.y - A.y) * py) / dAD;
    const Ox = A.x + u * px;
    const Oy = A.y + u * py;

    const qx = C.x - B.x;
    const qy = C.y - B.y;
    const dBC = Math.sqrt(qx * qx + qy * qy);
    const v = Math.pow(Ox - B.x, 2) + Math.pow(Oy - B.y, 2);
    const t = dBC / Math.sqrt(v);

    const Cx = B.x + t * (Ox - B.x);
    const Cy = B.y + t * (Oy - B.y);

    handlefpPointChange(2, Cx, Cy);
  }

  //Move point A or D
  const handleMainAxisMove = () => {
    const mainAxis = [
      { x: A.x, y: A.y },
      { x: D.x, y: D.y },
    ];
    const secondaryAxis = [
      { x: B.x, y: B.y },
      { x: C.x, y: C.y },
    ];
    if (!isAngle90Degrees(mainAxis, secondaryAxis)) {
      rotateSecondaryAxis(mainAxis, secondaryAxis);
    }
  };

  //Move point B or C
  const handleSecondaryAxisMove = () => {
    const mainAxis = [
      { x: A.x, y: A.y },
      { x: D.x, y: D.y },
    ];
    const secondaryAxis = [
      { x: B.x, y: B.y },
      { x: C.x, y: C.y },
    ];
    if (!isAngle90Degrees(mainAxis, secondaryAxis)) {
      rotateMainAxis(mainAxis, secondaryAxis);
    }
  };

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
          onMouseMove={handleMouseMovefp}
          onMouseUp={handleMouseUpfp}
        >
          {/* <rect
          width="750"
          height="1000"
          stroke="red"
          fill="transparent"
          stroke-width="2"
        /> */}

          {/* ----- SHAPES ----- */}
          <Circle3P points={fpPoints} />
          <Circle1P
            point={fpPoints[1]}
            radius={shapes[1].radius}
            color={shapes[1].color}
          />
          <Circle1P
            point={fpPoints[2]}
            radius={shapes[1].radius}
            color={shapes[1].color}
          />
          <Crosshair
            point={fpPoints[1]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />
          <Crosshair
            point={fpPoints[2]}
            radius={shapes[2].radius}
            color={shapes[2].color}
          />

          <Line
            start={fpPoints[0]}
            end={fpPoints[1]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={fpPoints[0]}
            end={fpPoints[2]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={fpPoints[0]}
            end={fpPoints[3]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Line
            start={fpPoints[1]}
            end={fpPoints[2]}
            extendStart={shapes[3].extendStart}
            extendEnd={shapes[3].extendEnd}
            arrowStart={shapes[3].arrowStart}
            arrowEnd={shapes[3].arrowEnd}
            strokeSize={shapes[3].strokeSize}
            color={shapes[3].color}
          />
          <Angle
            pivot={fpPoints[0]}
            ref1={fpPoints[1]}
            ref2={fpPoints[2]}
            radius={shapes[4].radius}
          />

          {/* ----- POINTS ----- */}
          {fpPoints.map((fpPoint, index) => (
            <FpPoint
              key={index}
              x={fpPoint.x}
              y={fpPoint.y}
              color={fpPoint.color}
              label={fpPoint.label}
              handleMouseDownfp={() => {
                setMouseDownfp(true);
                setSelectedIdxfp(index);
              }}
              handleMouseUpfp={() => {
                setMouseDownfp(false);
              }}
            />
          ))}
        </svg>
      </div>
    </>
  );
};
