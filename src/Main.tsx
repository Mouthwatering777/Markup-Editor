import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { MyEditorComponent } from "./components/myEditorComponent";
import { Perpendicular } from "./components/constraints/Perpendicular";

const Main = () => {
  // ----- Receive points and fpPoints (For Forced Perpendicularity) -----
  const [points, setPoints] = useState<point[]>([
    { x: 400, y: 300, color: "red", label: "First Point" },
    { x: 200, y: 400, color: "cyan", label: "Second Point" },
    { x: 600, y: 600, color: "yellow", label: "Third Point" },
    { x: 300, y: 750, color: "black", label: "Last Point" },
  ]);

  const [fpPoints, setFpPoints] = useState<fpPoint[]>([
    { x: 400, y: 300, color: "red", label: "First Point" },
    { x: 200, y: 400, color: "cyan", label: "Second Point" },
    { x: 600, y: 600, color: "yellow", label: "Third Point" },
    { x: 300, y: 750, color: "black", label: "Last Point" },
  ]);

  // ----- Receive shapes (Currently 4 shapes) -----
  const [shapes, setShapes] = useState<shape[]>([
    {
      type: "Circle3P",
      color: "yellow",
      strokeSize: 2,
      radius: 0,
    },
    {
      type: "Circle1P",
      radius: 100,
      color: "lightblue",
      strokeSize: 2,
    },
    {
      type: "Crosshair",
      color: "lightblue",
      strokeSize: 2,
      radius: 100,
    },
    {
      type: "Line",
      color: "lightgreen",
      strokeSize: 2,
      radius: 0,
      extendStart: 50,
      extendEnd: 50,
      arrowStart: true,
      arrowEnd: true,
    },
    { type: "Angle", color: "red", strokeSize: 2, radius: 100 },
  ]);

  //----- Update x, y position of points and fpPoints for every change -----
  const handlePointsChange = (idx: number, x: number, y: number) => {
    const newPoints = [...points];
    newPoints[idx].x = x;
    newPoints[idx].y = y;
    setPoints(newPoints);
  };

  const handleFpPointsChange = (newFpPoints: point[]) => {
    setFpPoints(newFpPoints);
  };
  // return (
  //   // <Routes>
  //   //   <Route
  //   //     path="/"
  //   //     element={
  //   //       <MyEditorComponent
  //   //         imageURL="/assets/images/y.jpg"
  //   //         points={points}
  //   //         fpPoints={fpPoints}
  //   //         shapes={shapes}
  //   //         handlePointsChange={handlePointsChange}
  //   //         handleFpPointsChange={handleFpPointsChange}
  //   //         // constraints={[constraint.FP, constraint.Slider]}
  //   //         constraints={[]}
  //   //       />
  //   //     }
  //   //   />
  //   //   <Route
  //   //     path="/FC"
  //   //     element={
  //   //       <Perpendicular
  //   //         points={fpPoints}
  //   //         handleChangeFpPoints={handleFpPointsChange}
  //   //         handleMouseDown={() => {
  //   //           //   setMouseDown(true);
  //   //         }}
  //   //       />
  //   //     }
  //   //   />
  //   // </Routes>
  // );
};

export default Main;
