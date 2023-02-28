import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Main Components to edit
import { MyEditorComponent } from "./components/myEditorComponent";
import { Perpendicular } from "./components/constraints/Perpendicular";
import { Slider } from "./components/constraints/Slider";

function App() {
  // ----- Receive points  -----
  const [points, setPoints] = useState<point[]>([
    { x: 600, y: 100, color: "red", label: "First Point" },
    { x: 300, y: 200, color: "cyan", label: "Second Point" },
    { x: 800, y: 400, color: "purple", label: "Third Point" },
    { x: 500, y: 600, color: "black", label: "Last Point" },
  ]);

  const [fpPoints, setFpPoints] = useState<point[]>([
    { x: 600, y: 200, color: "red", label: "First Point" },
    { x: 400, y: 500, color: "cyan", label: "Second Point" },
    { x: 800, y: 300, color: "purple", label: "Third Point" },
    { x: 500, y: 600, color: "black", label: "Last Point" },
  ]);

  const [sPoints, setSPoints] = useState<point[]>([
    { x: 600, y: 200, color: "red", label: "First Point" },
    { x: 400, y: 500, color: "cyan", label: "Second Point" },
    { x: 800, y: 300, color: "purple", label: "Third Point" },
    { x: 500, y: 600, color: "black", label: "Last Point" },
    { x: 500, y: 350, color: "lightgreen", label: "Middle Point" },
  ]);

  // ----- Receive shapes (Currently 5 shapes) -----
  const [shapes, setShapes] = useState<shape[]>([
    {
      type: "Circle3P",
      color: "yellow",
      strokeSize: 2,
      radius: 0,
    },
    {
      type: "Circle1P",
      radius: 60,
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

  //----- Update x, y position of only one selected point -----
  const handlePointChange = (idx: number, x: number, y: number) => {
    const newPoints = [...points];
    newPoints[idx].x = x;
    newPoints[idx].y = y;
    setPoints(newPoints);
  };

  const handlefpPointChange = (idx: number, x: number, y: number) => {
    const newPoints = [...fpPoints];
    newPoints[idx].x = x;
    newPoints[idx].y = y;
    setFpPoints(newPoints);
  };

  const handleSPointChange = (idx: number, x: number, y: number) => {
    const newPoints = [...sPoints];
    newPoints[idx].x = x;
    newPoints[idx].y = y;
    setSPoints(newPoints);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MyEditorComponent
              imageURL="/assets/images/y.jpg"
              points={points}
              shapes={shapes}
              handlePointChange={handlePointChange}
              // constraints={[]}
            />
          }
        ></Route>
        <Route
          path="/FC"
          element={
            <Perpendicular
              imageURL="/assets/images/y.jpg"
              fpPoints={fpPoints}
              shapes={shapes}
              handlefpPointChange={handlefpPointChange}
            />
          }
        ></Route>
        <Route
          path="/Slider"
          element={
            <Slider
              imageURL="/assets/images/y.jpg"
              sPoints={sPoints}
              shapes={shapes}
              handleSPointChange={handleSPointChange}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
