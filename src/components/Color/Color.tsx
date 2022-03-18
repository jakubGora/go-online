import React from "react";
import { IColor } from "../../interfaces/interface";
import "./Color.css";
interface IColorProps {
  color: IColor;
  removeColor: (id: number) => void;
}

class Color extends React.Component<IColorProps> {
  render() {
    return (
      <div
        style={{ backgroundColor: `${this.props.color.color}` }}
        className="Color"
      >
        <div className="top">
          {this.props.color.colorId ? (
            <button
              onClick={() =>
                this.props.removeColor(this.props.color.colorId as number)
              }
            >
              X
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="content">
          <p>{this.props.color.color}</p>
        </div>
      </div>
    );
  }
}

export default Color;
