import React from "react";

type Props = {
  points: point[];
};

// Component to draw a circle from three given points
export const Circle3P: React.FC<Props> = ({ points }) => {
  const [p1, p2, p3] = points;
  const x12 = p1.x - p2.x;
  const x13 = p1.x - p3.x;

  const y12 = p1.y - p2.y;
  const y13 = p1.y - p3.y;

  const y31 = -y13;
  const y21 = -y12;

  const x31 = p3.x - p1.x;
  const x21 = p2.x - p1.x;

  const sx13 = Math.pow(p1.x, 2) - Math.pow(p3.x, 2);
  const sy13 = Math.pow(p1.y, 2) - Math.pow(p3.y, 2);

  const sx21 = Math.pow(p2.x, 2) - Math.pow(p1.x, 2);
  const sy21 = Math.pow(p2.y, 2) - Math.pow(p1.y, 2);

  var f =
    (sx13 * x12 + sy13 * x12 + sx21 * x13 + sy21 * x13) /
    (2 * (y31 * x12 - y21 * x13));
  var g =
    (sx13 * y12 + sy13 * y12 + sx21 * y13 + sy21 * y13) /
    (2 * (x31 * y12 - x21 * y13));
  var c = -Math.pow(p1.x, 2) - Math.pow(p1.y, 2) - 2 * g * p1.x - 2 * f * p1.y;

  const centerPointX = -g;
  const centerPointY = -f;
  const radius = Math.sqrt(g * g + f * f - c);

  return (
    <circle
      cx={centerPointX}
      cy={centerPointY}
      r={radius}
      fill="transparent"
      stroke="yellow"
      stroke-width="2"
    />
  );
};
