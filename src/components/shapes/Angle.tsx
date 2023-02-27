import React from "react";

type AngleProps = {
  pivot: { x: number; y: number };
  ref1: { x: number; y: number };
  ref2: { x: number; y: number };
  radius: number;
};

const Angle: React.FC<AngleProps> = (props) => {
  const { pivot, ref1, ref2, radius } = props;

  const startAngle = Math.atan2(ref1.y - pivot.y, ref1.x - pivot.x);
  const endAngle = Math.atan2(ref2.y - pivot.y, ref2.x - pivot.x);

  const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
  //Result
  const Angle = ((startAngle - endAngle) * 180) / Math.PI;
  const Result = (Angle <= 180 ? Angle : 360 - Angle).toFixed(2);
  const Display = `Ang=${Result}deg`;
  const d1 = Math.sqrt(
    Math.pow(ref1.x - pivot.x, 2) + Math.pow(ref1.y - pivot.y, 2)
  );
  const x1 = pivot.x + (radius * (ref1.x - pivot.x)) / d1;
  const y1 = pivot.y + (radius * (ref1.y - pivot.y)) / d1;

  const d2 = Math.sqrt(
    Math.pow(ref2.x - pivot.x, 2) + Math.pow(ref2.y - pivot.y, 2)
  );
  const x2 = pivot.x + (radius * (ref2.x - pivot.x)) / d2;
  const y2 = pivot.y + (radius * (ref2.y - pivot.y)) / d2;

  const textStyle = {
    fontFamily: "Arial",
    fontSize: 20,
    stroke: "lightblue",
    fill: "transparent",
  };

  console.log(
    `startAngle:${startAngle} endAngle:${endAngle} Result:${largeArcFlag} Angle:${Angle} Result:${Result}`
  );
  return (
    <>
      <path
        d={`M${pivot.x} ${pivot.y} L${x1} ${y1} A${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`}
        stroke="red"
        fill="none"
        strokeWidth="2"
      ></path>
      <text x={pivot.x - 50} y={pivot.y + 50} style={textStyle}>
        {Display}
      </text>
    </>
  );
};
export default Angle;
/* {Angle >= Math.PI && (
        <path
          d={`M${pivot.x} ${pivot.y} L${x1} ${y1} A${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`}
          stroke="red"
          fill="none"
          strokeWidth="2"
        />
      )}
      {Angle <= Math.PI && (
        <path
          d={`M${pivot.x} ${pivot.y} L${x2} ${y2} A${radius} ${radius} 0 ${
            (Result * Math.PI) / 180
          } 0 ${x1} ${y1} Z`}
          stroke="red"
          fill="none"
          strokeWidth="2"
        />
      )} */

//   const pathData = [
//     `M ${ref1.x} ${ref1.y}`,
//     `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${ref2.x} ${ref2.y}`,
//   ].join(" ");

//   console.log(
//     `startAngle:${startAngle} endAngle:${endAngle} Result:${largeArcFlag}`
//   );
//   return <path d={pathData} stroke="red" fill="none" strokeWidth="2" />;
