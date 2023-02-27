import React, { MouseEventHandler } from "react";

type Props = {
  x: number;
  y: number;
  color: string;
  handleMouseDown: MouseEventHandler<SVGElement>;
  label: string;
};

export const Point: React.FC<Props> = ({
  x,
  y,
  color,
  handleMouseDown,
  label,
}) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r={8}
        stroke={color}
        strokeWidth="1"
        fill={color}
        onMouseDown={handleMouseDown}
      />
      <rect
        x={x + 30}
        y={y - 18}
        height="35"
        width="150"
        rx="10"
        ry="15"
        stroke="#006600"
        fill="#FFF"
      />
      <text
        x={x + 40}
        y={y + 5}
        fill={color}
        style={{ userSelect: "none" }}
        onMouseDown={handleMouseDown}
        fontSize="1.3rem"
      >
        {label}
      </text>
    </>
  );
};
