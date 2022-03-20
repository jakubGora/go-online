import React, { useEffect, useState } from "react";
import { IColor } from "../../interfaces/interface";
import Color from "../Color/Color";

import Filter from "../Filter/Filter";

import "./ColorList.css";

interface IColorList {
  setSavedColors: React.Dispatch<React.SetStateAction<IColor[]>>;
  savedColors: IColor[];
}

const ColorList: React.FC<IColorList> = ({ setSavedColors, savedColors }) => {
  const [red, setRed] = useState<number>();
  const [green, setGreen] = useState<number>();
  const [blue, setBlue] = useState<number>();
  const [saturation, setSaturation] = useState<number>();
  const [redSign, setRedSign] = useState<string>(">");
  const [greenSign, setGreenSign] = useState<string>(">");
  const [blueSign, setBlueSign] = useState<string>(">");
  const [saturationSign, setSaturationSign] = useState<string>(">");

  const filterColor = (
    color: number,
    sign: string,
    filterCol: number | undefined
  ): boolean => {
    if (filterCol)
      switch (sign) {
        case "<":
          return color < filterCol;

        case "=":
          return color === filterCol;

        case ">":
          return color > filterCol;

        default:
          return true;
      }
    else return true;
  };

  const removeColor = (id: number): void => {
    let filter = savedColors.filter((e) => e.colorId !== id);
    let localColors = { Colors: [...filter] };
    setSavedColors(filter);
    localStorage.setItem("colors", JSON.stringify(localColors));
  };

  const filterColorsList = (elem: IColor): boolean => {
    return (
      filterColor((elem.red / 255) * 100, redSign, red) &&
      filterColor((elem.green / 255) * 100, greenSign, green) &&
      filterColor((elem.blue / 255) * 100, blueSign, blue) &&
      filterColor(elem.saturation, saturationSign, saturation)
    );
  };

  useEffect(() => {
    if (localStorage.getItem("colors"))
      setSavedColors(
        (prev) =>
          [
            ...prev,
            ...(JSON.parse(localStorage.getItem("colors") as string)[
              "Colors"
            ] as IColor[]),
          ] as IColor[]
      );
  }, []);

  return (
    <div className="ColorList">
      <Filter
        setRed={setRed}
        setGreen={setGreen}
        setBlue={setBlue}
        setSaturation={setSaturation}
        setRedSign={setRedSign}
        setGreenSign={setGreenSign}
        setBlueSign={setBlueSign}
        setSaturationSign={setSaturationSign}
        red={red}
        green={green}
        blue={blue}
        saturation={saturation}
      />
      <div className="lists">
        <div className="list">
          <h3>Lista kolorów</h3>{" "}
          {savedColors
            .filter((e) => filterColorsList(e))
            .sort(
              (a, b) => b.red - a.red || b.green - a.green || b.blue - a.blue
            )
            .map((e, i) => (
              <Color key={i} color={e} removeColor={removeColor} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ColorList;
