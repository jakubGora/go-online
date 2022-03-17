import React, { useEffect, useState } from "react";

import "./AddColor.css";

const First = () => {
  const [inputColor, setInputColor] = useState<string>("#");
  const [error, setError] = useState<string | null>(null);

  const onSubmitFun = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validInputColor(inputColor)) {
      setError(null);
      // dodawanie do bazy
      let localColors = localStorage.getItem("colors");

      localStorage.setItem(
        "colors",
        (localColors ? localColors + "|" : "") + inputColor
      );

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
    let regex = new RegExp("^[A-F0-9]{1}$");
    if (!regex.test(e.target.value[e.target.value.length - 1])) {
      e.target.value = e.target.value.substring(0, e.target.value.length - 1);
    }
    setInputColor(e.target.value);
  };

  const validInputColor = (input: string): boolean => {
    let regex = new RegExp("^#$|[a-fA-F0-9]{6}$");
    return input.length === 7 && regex.test(input);
  };

  useEffect(() => {
    // localStorage.setItem("colors", "");
    console.log(localStorage.getItem("colors")?.split("|"));
  }, []);
  return (
    <div className="First">
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
        {error ? <div className="error">{error}</div> : null}
        <input type="submit" />
      </form>
    </div>
  );
};

export default First;
