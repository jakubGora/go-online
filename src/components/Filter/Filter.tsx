import React, { useEffect, useState } from "react";

import "./Filter.css";

interface IFilter {
  setRed: React.Dispatch<React.SetStateAction<number | undefined>>;
  setGreen: React.Dispatch<React.SetStateAction<number | undefined>>;
  setBlue: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSaturation: React.Dispatch<React.SetStateAction<number | undefined>>;
  setRedSign: React.Dispatch<React.SetStateAction<string>>;
  setGreenSign: React.Dispatch<React.SetStateAction<string>>;
  setBlueSign: React.Dispatch<React.SetStateAction<string>>;
  setSaturationSign: React.Dispatch<React.SetStateAction<string>>;
  red: number | undefined;
  green: number | undefined;
  blue: number | undefined;
  saturation: number | undefined;
}

const Filter: React.FC<IFilter> = ({
  setRed,
  setGreen,
  setBlue,
  setSaturation,
  setBlueSign,
  setGreenSign,
  setRedSign,
  setSaturationSign,
  red,
  green,
  blue,
  saturation,
}) => {
  const [redActive, setRedActive] = useState<boolean>(false);
  const [greenActive, setGreenActive] = useState<boolean>(false);
  const [blueActive, setBlueActive] = useState<boolean>(false);
  const [saturationActive, setSaturationActive] = useState<boolean>(false);

  return (
    <div className="Filter">
      <h2>Filtry:</h2>
      <form>
        <label htmlFor="red">
          <p>Red: </p>
          <input
            type="checkbox"
            checked={redActive}
            onChange={() => {
              setRedActive(!redActive);
              setRed(undefined);
            }}
          />
          {redActive && (
            <>
              <select
                onChange={(e) => setRedSign(e.target.value)}
                name="sign"
                id="sign"
              >
                <option value=">">{">"}</option>
                <option value="=">{"="}</option>
                <option value="<">{"<"}</option>
              </select>
              <input
                onChange={(e) => setRed(Number(e.target.value))}
                value={red}
                name="red"
                type="number"
                min={0}
                max={100}
                data-color
              />
              <p>%</p>
            </>
          )}
        </label>
        <label htmlFor="green">
          <p>Green: </p>{" "}
          <input
            type="checkbox"
            onChange={() => {
              setGreenActive(!greenActive);
              setGreen(undefined);
            }}
            checked={greenActive}
          />
          {greenActive && (
            <>
              <select
                onChange={(e) => setGreenSign(e.target.value)}
                name="sign"
                id="sign"
              >
                <option value=">">{">"}</option>
                <option value="=">{"="}</option>
                <option value="<">{"<"}</option>
              </select>
              <input
                onChange={(e) => setGreen(Number(e.target.value))}
                name="green"
                type="number"
                value={green}
                min={0}
                max={100}
                data-color
              />
              <p>%</p>
            </>
          )}
        </label>{" "}
        <label htmlFor="blue">
          <p>Blue: </p>{" "}
          <input
            type="checkbox"
            onChange={() => {
              setBlueActive(!blueActive);
              setBlue(undefined);
            }}
            checked={blueActive}
          />
          {blueActive && (
            <>
              <select
                onChange={(e) => setBlueSign(e.target.value)}
                name="sign"
                id="sign"
              >
                <option value=">">{">"}</option>
                <option value="=">{"="}</option>
                <option value="<">{"<"}</option>
              </select>
              <input
                onChange={(e) => setBlue(Number(e.target.value))}
                name="blue"
                type="number"
                value={blue}
                data-color
                min={0}
                max={100}
              />
              <p>%</p>
            </>
          )}
        </label>
        <label htmlFor="saturation">
          <p>Saturation: </p>{" "}
          <input
            type="checkbox"
            onChange={() => {
              setSaturationActive(!saturationActive);
              setSaturation(undefined);
            }}
            checked={saturationActive}
          />
          {saturationActive && (
            <>
              <select
                onChange={(e) => setSaturationSign(e.target.value)}
                name="sign"
                id="sign"
              >
                <option value=">">{">"}</option>
                <option value="=">{"="}</option>
                <option value="<">{"<"}</option>
              </select>
              <input
                onChange={(e) => setSaturation(Number(e.target.value))}
                name="saturation"
                type="number"
                value={saturation}
                data-color
                min={0}
                max={100}
              />
              <p>%</p>{" "}
            </>
          )}
        </label>
      </form>
    </div>
  );
};

export default Filter;
