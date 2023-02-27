import React from "react";
// import { Point } from "../points/Point";

type Props = {
  point: {
    x: number;
    y: number;
    color: string;
    label: string;
  };
  radius: number;
  color: string;
};
// Component to draw a circle from one point and radius
export const Circle1P: React.FC<Props> = ({ point, radius, color }) => {
  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={radius}
      fill="transparent"
      stroke={color}
      stroke-width="2"
    />
  );
};
