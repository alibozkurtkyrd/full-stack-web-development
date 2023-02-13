import React from "react";
import NavButtons from "./NavButtons";
import AddProductForm from "./AddProductForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProductPage() {

  const navigate = useNavigate();

  function handleSubmit(inputs) {
    // this function gets the input values from child component and post to backend

    var product = {}; // Create new object

    product["sku"] = inputs.sku;
    product["name"] = inputs.name;
    product["price"] = inputs.price;
    product["type"] = inputs.type;

    // Fill the product'sspecific attribute depend on its value
    if (inputs.type === "book") {
      product["weight"] = inputs.weight;
    } else if (inputs.type === "dvd") {
      product["size"] = inputs.size;
    } else if (inputs.type === "furniture") {
      product["dimension"] =
        inputs.height + "x" + inputs.width + "x" + inputs.length;
    }

    axios
      .post("http://3.87.148.126/backend/Api/index.php", JSON.stringify(product)) // post product object to API
      .then(function (response) {
        console.log(response.data);
        navigate("/"); // route to main page
      });
  }

  return (
    <div>
      <NavButtons
        name="Product Add"
        btnName1="Save"
        btnName2="Cancel"
        linkName2="/"
        btn2_id="cancel-btn"
        type="submit"
        formId="product_form"
        delSelectedCheckBoxes={() => {}} // create a dummy(empty) function
      />
      <AddProductForm sendInputs={handleSubmit} />
    </div>
  );
}

export default AddProductPage;
