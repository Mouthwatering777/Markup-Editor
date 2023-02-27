declare module "*.jpg";
declare module "*.png";

// ----- App.tsx -----

declare type shape = {
  type: string;
  color: string;
  strokeSize: number;
  radius: number;
  extendStart?: number;
  extendEnd?: number;
  arrowStart?: boolean;
  arrowEnd?: boolean;
};
declare type point = {
  x: number;
  y: number;
  color: string;
  label: string;
  // constraints: string;
};
declare type fpPoint = {
  x: number;
  y: number;
  color: string;
  label: string;
};
declare enum constraint {
  FP = "FP",
  Slider = "Slider",
}

// ----- myEditorComponent.tsx -----

declare const divStyle = {
  display: "flex",
  width: "100%",
  color: "white",
  backgroundColor: "Darkblue",
  padding: "0.1rem",
  fontFamily: "Arial",
  backgroundImage: `url(${imageURL})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
declare const svgDivStyle = {
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

// ----- Perpendicular.tsx -----

declare type Point = {
  x: number;
  y: number;
};
// declare type Points = {
//   Point[];
// };
