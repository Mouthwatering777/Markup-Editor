import React from "react";

type point = {
  x: number;
  y: number;
};
type Props = {
  point: point;
  radius: number;
  color: string;
};

const Crosshair: React.FC<Props> = ({ point, radius, color }) => {
  const { x, y } = point;
  return (
    <>
      <line x1={x - radius} y1={y} x2={x + radius} y2={y} stroke={color} />
      <line x1={x} y1={y - radius} x2={x} y2={y + radius} stroke={color} />
    </>
  );
};

export default Crosshair;
