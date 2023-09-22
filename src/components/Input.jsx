import React from "react";
import "./Style.css";

export default function Input(props) {
  return (
    <div className="input">
      <label className="label">{props.label}</label>
      <input
        className="values"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
