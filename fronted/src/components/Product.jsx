import React from "react";
// import { useState } from "react";

function Product(props) {
  function handleChangeInner(event) {
    // Here, we invoke the callback with the new value
    props.handleChange(event);
  }
  return (
    <div className="box">
      <input
        type="checkbox"
        value={props.productValue}
        checked={props.productChecked}
        onChange={handleChangeInner}
        className="delete-checkbox"
        name="productCheckbox"
      ></input>

      <div className="box-text">
        <p>{props.sku}</p>
        <p>{props.name}</p>
        <p>{props.price}</p>
        <p>{props.specificAttrbute}</p>
      </div>
    </div>
  );
}

export default Product;
