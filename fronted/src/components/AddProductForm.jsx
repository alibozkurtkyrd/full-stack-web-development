import React, { useState, useEffect } from "react";
// import AddProductInnerForm from "./AddProductInnerForm";

function AddProductForm(props) {
  const [switcherValue, setswitcherValue] = useState("dvd"); // this state created for switch operation
  const [inputs, setInputs] = useState({
    sku: "",
    name: "",
    price: "",
    type: "dvd",
    size: "",
  }); // this state is created for submitting form
  const [formErrors, setFormErrors] = useState({}); // Validation error array
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log("test name: " + name);
    await setInputs((values) => ({ ...values, [name]: value }));
  };

  function setSelect(event) {
    // this is for switch select operation
    var selectedValue = event.target.value;
    //  console.log(selectedValue);
    setswitcherValue(selectedValue);
    setInputs((values) => ({
      ...values,
      type: selectedValue,
      size: "",
      weight: "",
      height: "",
      length: "",
      width: "",
    }));
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // if there is no error submit the form
      props.sendInputs(inputs);
    }
  }, [formErrors, isSubmit, inputs, props]);

  function submitFormInner(event) {
    // its triggered when form is submitted
    event.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(inputs)); // call validate function
  }

  const validate = (values) => {
    // this function ensures input field validation and detecting missing values
    const errors = {};

    const regex = /^(?!$)\d{0,10}(?:\.\d{1,2})?$/gm; // this match with decimal(10,2);
    // 1- Maximum 8 digits before decimal(.) point,
    // 2- Maximum 2 digits after decimal point(or its optional)

    const regex2 = /^(?!$)\d{0,11}$/gm; // this regex for size,height, width and length inputs (positive integers max value with 999999999)

    if (!values.sku) {
      errors.sku = "Please, submit required data";
    }
    if (!values.name) {
      errors.name = "Please, submit required data";
    }
    if (!values.price) {
      errors.price = "Please, submit required data";
    } else if (!regex.test(values.price)) {
      errors.price = "Please, provide the data of indicated type";
    }

    // validation for furniture,dvd and book types
    if (values.type === "furniture") {
      // if type equals to furniture remove errors for other type(book and dvd)
      if (errors.size) delete errors.size;
      if (errors.weight) delete errors.weight;

      if (!values.height) {
        errors.height = "Please, submit required data";
      } else if (!regex2.test(values.height)) {
        errors.height = "Please, provide the data of indicated type";
      }

      const regex3 = /^(?!$)\d{0,11}$/gm; // normaly its exactly equal width regex2 but when use same regex fpr width, lengh and height it gives error
      const flagWidth = regex3.test(values.width);

      if (!values.width) {
        errors.width = "Please, submit required data";
      } else if (!flagWidth) {
        errors.width = "Please, provide the data of indicated type";
      }

      const regex4 = /^(?!$)\d{0,11}$/gm; // normaly its exactly equal width regex2 but when use same regex for width, lengh and height it gives error

      if (!values.length) {
        errors.length = "Please, submit required data";
      } else if (!regex4.test(values.length)) {
        errors.length = "Please, provide the data of indicated type";
      }
    } else if (values.type === "dvd") {
      // if type equals to dvd remove errors for other type(furniture and dvd)

      if (errors.height) delete errors.height;
      if (errors.width) delete errors.width;
      if (errors.length) delete errors.length;

      if (errors.weight) delete errors.weight;

      if (!values.size) {
        errors.size = "Please, submit required data";
      } else if (!regex2.test(values.size)) {
        errors.size = "Please, provide the data of indicated type";
      }
    } else if (values.type === "book") {
      // if type equals to dvd remove errors for other type(furniture and dvd)
      if (errors.height) delete errors.height;
      if (errors.width) delete errors.width;
      if (errors.length) delete errors.length;

      if (errors.size) delete errors.size;

      const regexWeight = /^(?!$)\d{0,10}(?:\.\d{1,2})?$/gm; //its exactly equal width regex

      var flag = regexWeight.test(values.weight);

      if (!values.weight) {
        errors.weight = "Please, submit required data";
      } else if (!flag) {
        errors.weight = "Please, provide the data of indicated type";
      }
    }

    return errors;
  };
  return (
    <div>
      <form id="product_form" className="ml-3" onSubmit={submitFormInner}>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">SKU</label>
          <div className="col-sm-4">
            <input
              id="sku"
              name="sku"
              type="text"
              className="form-control"
              placeholder="sku"
              value={inputs.sku}
              onChange={handleChange}
            />

            <p style={{ color: "red" }}>{formErrors.sku}</p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-1 col-form-label">Name</label>
          <div className="col-sm-4">
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{formErrors.name}</p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-1 col-form-label">Price($)</label>
          <div className="col-sm-4">
            <input
              id="price"
              name="price"
              type="text"
              className="form-control"
              placeholder="price"
              value={inputs.price}
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{formErrors.price}</p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-1">Type Swittcher</label>
          <div className="col-sm-4">
            <select
              className="custom-select mr-sm-2"
              id="productType"
              onChange={setSelect}
            >
              {/* <option selected>Choose...</option> */}
              <option id="DVD" defaultValue="dvd" value="dvd">
                DVD
              </option>
              <option id="Book" value="furniture">
                Furniture
              </option>
              <option id="Furniture" value="book">
                Book
              </option>
            </select>
          </div>
        </div>

        {switcherValue === "dvd" && (
          <div className="w-50 p-3 ml-3 border border-dark">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Size (MB)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="size"
                  name="size"
                  onChange={handleChange}
                  value={inputs.size}
                  className="form-control"
                />
                <p style={{ color: "red" }}>{formErrors.size}</p>
              </div>
            </div>
            <p>please provide size of DVD</p>
          </div>
        )}

        {switcherValue === "book" && (
          <div className="w-50 p-3 ml-3 border border-dark">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Weight (KG)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  onChange={handleChange}
                  value={inputs.weight}
                  className="form-control"
                />
                <p style={{ color: "red" }}>{formErrors.weight}</p>
              </div>
            </div>
            <p>please provide weight of Book</p>
          </div>
        )}

        {switcherValue === "furniture" && (
          <div className="w-50 p-3 ml-3 border border-dark">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Height (CM)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={inputs.height}
                  className="form-control"
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}>{formErrors.height}</p>
              </div>

              <label className="col-sm-3 col-form-label">Width (CM)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="width"
                  name="width"
                  className="form-control"
                  value={inputs.width}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}>{formErrors.width}</p>
              </div>

              <label className="col-sm-3 col-form-label">Length (CM)</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  id="length"
                  name="length"
                  className="form-control"
                  value={inputs.length}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}>{formErrors.length}</p>
              </div>
            </div>
            <p>Please Provide dimensions in HxWxL Format</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProductForm;
