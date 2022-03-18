import React, { useEffect, useState } from "react";

import "./App.css";
import AddColor from "./components/AddColor/AddColor";
import ColorList from "./components/ColorList/ColorList";
import { IColor } from "./interfaces/interface";

export const rgbToLightness = (r: number, g: number, b: number): number =>
  (1 / 2) * (Math.max(r, g, b) + Math.min(r, g, b));

export const rgbToSaturation = (r: number, g: number, b: number): number => {
  const L: number = rgbToLightness(r, g, b);
  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  return L === 0 || L === 1 ? 0 : (max - min) / (1 - Math.abs(2 * L - 1));
};

const App: React.FC = () => {
  const [savedColors, setSavedColors] = useState<IColor[]>([]);

  const preDefColorList: string[] = [
    "#F44336",
    "#FFEBEE",
    "#FFCDD2",
    "#EF9A9A",
    "#E57373",

    "#FF80AB",
    "#FF4081",
    "#F50057",
    "#C51162",
    "#9C27B0",

    "#6A1B9A",
    "#4A148C",
    "#EA80FC",
    "#E040FB",
    "#D500F9",

    "#E8EAF6",
    "#C5CAE9",
    "#9FA8DA",
    "#7986CB",

    "#3D5AFE",
    "#304FFE",
    "#2196F3",
    "#E3F2FD",

    "#004D40",
    "#A7FFEB",
    "#64FFDA",
    "#1DE9B6",
    "#00BFA5",
    "#4CAF50",

    "#00C853",
    "#8BC34A",
    "#F1F8E9",
    "#DCEDC8",

    "#F9FBE7",
    "#F0F4C3",
    "#E6EE9C",
    "#DCE775",
    "#D4E157",
    "#CDDC39",
    "#C0CA33",
    "#AFB42B",
    "#9E9D24",
    "#827717",

    "#FDD835",
    "#FBC02D",
    "#F9A825",
    "#F57F17",
    "#FFFF8D",
    "#FFFF00",
    "#FFEA00",
    "#FFD600",
    "#FFC107",
    "#FFF8E1",
    "#FFECB3",
    "#FFE082",

    "#FFF3E0",
    "#FFE0B2",
    "#FFCC80",
    "#FFB74D",
    "#FFA726",
    "#FF9800",
    "#FB8C00",
    "#F57C00",
    "#EF6C00",
    "#E65100",
    "#FFD180",

    "#FF6E40",
    "#FF3D00",
    "#DD2C00",
    "#795548",
    "#EFEBE9",
    "#D7CCC8",
    "#BCAAA4",

    "#B0BEC5",
    "#90A4AE",
    "#78909C",
    "#607D8B",
    "#546E7A",
    "#455A64",
    "#37474F",
    "#263238",
    "#000000",
    "#FFFFFF",
  ];

  useEffect(() => {
    // localStorage.setItem("colors", "");
    if (!localStorage.getItem("colors")) {
      let map: IColor[] = preDefColorList.map(
        (e) =>
          ({
            color: e,
            red: parseInt(e.substring(1, 3), 16),
            green: parseInt(e.substring(3, 5), 16),
            blue: parseInt(e.substring(5, 7), 16),
            saturation: Math.floor(
              Math.abs(
                rgbToSaturation(
                  parseInt(e.substring(1, 3), 16),
                  parseInt(e.substring(3, 5), 16),
                  parseInt(e.substring(5, 7), 16)
                )
              ) * 100
            ),
          } as IColor)
      );

      setSavedColors((prev) => [...prev, ...map] as IColor[]);
    }
  }, []);

  return (
    <div className="App">
      <AddColor setSavedColor={setSavedColors} />
      <ColorList savedColors={savedColors} setSavedColors={setSavedColors} />
    </div>
  );
};

export default App;
