import React, { useEffect, useState } from "react";
import { rgbToSaturation } from "../../App";
import { IColor } from "../../interfaces/interface";

import "./AddColor.css";

interface IAddColor {
  setSavedColor: React.Dispatch<React.SetStateAction<IColor[]>>;
}

const AddColor: React.FC<IAddColor> = ({ setSavedColor }) => {
  const [inputColor, setInputColor] = useState<string>("#");
  const [error, setError] = useState<string | null>(null);

  const onSubmitFun = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validInputColor(inputColor)) {
      setError(null);

      let color: IColor = {
        colorId: Date.now(),
        color: inputColor,
        red: parseInt(inputColor.substring(1, 3), 16),
        green: parseInt(inputColor.substring(3, 5), 16),
        blue: parseInt(inputColor.substring(5, 7), 16),
        saturation: Math.floor(
          Math.abs(
            rgbToSaturation(
              parseInt(inputColor.substring(1, 3), 16),
              parseInt(inputColor.substring(3, 5), 16),
              parseInt(inputColor.substring(5, 7), 16)
            )
          ) * 100
        ),
      };

      let localColors;
      if (localStorage.getItem("colors")) {
        localColors = JSON.parse(localStorage.getItem("colors") as string);
      } else {
        localColors = { Colors: [] };
      }

      localColors["Colors"].push(color);

      localStorage.setItem("colors", JSON.stringify(localColors));
      setSavedColor((prev) => [...prev, color]);

      setInputColor("#");
    } else {
      setError("Wprowadź kolor poprawnie");
    }
  };

  const changingInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.target.value = e.target.value.toUpperCase();
    if (e.target.value[0] != "#") {
      e.target.value = "#" + e.target.value;
    }
    let regex: RegExp = new RegExp("^[A-F0-9]{1}$");
    if (!regex.test(e.target.value[e.target.value.length - 1])) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    }
    setInputColor(e.target.value);
  };

  const validInputColor = (input: string): boolean => {
    let regex: RegExp = new RegExp("^#$|[a-fA-F0-9]{6}$");
    return input.length === 7 && regex.test(input);
  };

  return (
    <div className="AddColor">
      <h2>Dodaj kolor:</h2>
      <form onSubmit={(e) => onSubmitFun(e)}>
        <label htmlFor="Color">
          <p>Color: </p>
          <input
            onChange={(e) => changingInput(e)}
            value={inputColor}
            type="text"
            data-color
            maxLength={7}
          />
          <div
            style={{
              backgroundColor: validInputColor(inputColor)
                ? inputColor
                : "white",
            }}
            className="colorTest"
          >
            {validInputColor(inputColor) ? "" : "invalid"}
          </div>
        </label>
        {error ? (
          <div className="error">
            {error}
            <p>
              Wpisany kod koloru musi składać się z 7 znaków:
              <br /> '#' - pierwszy znak, <br /> oraz <br /> 6 znaków z zakresu
              [0-9] i [A-F]
            </p>
          </div>
        ) : null}
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddColor;
