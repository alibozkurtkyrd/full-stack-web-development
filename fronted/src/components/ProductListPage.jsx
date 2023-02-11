import React from "react";
import Product from "./Product";
// import ProductList from "./testArray"
import NavButtons from "./NavButtons";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isChecked, setIsChecked] = useState([]); // its for checkbox

  useEffect(() => {
    getProducts();
  }, []);

  const handleCheckBox = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // if its checked add it into isChecked array
      setIsChecked([...isChecked, value]);
    } else {
      //else remove from isChecked array
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  function deleteCheckBoxes() {
    var deletedProductSkus = {
      // create new object with skus key and assing isChecked array to key as value
      skus: isChecked,
    };

    axios
      .delete(`http://127.0.0.1:8000/Api/index`, {
        data: JSON.stringify(deletedProductSkus),
      })
      .then(function (response) {
        console.log(response.data);

        getProducts(); // get products from API again
      });
  }

  function getSpecialAttr(product) {
    // this method get product object and returned special Attribute for Product
    if (product.type === "book") return "Weight: " + product.weight + " KG";
    else if (product.type === "dvd") return "Size: " + product.size + " MB";
    else if (product.type === "furniture")
      return "Dimension: " + product.dimension;
  }

  function getProducts() {
    // this methods fetch produts from API
    axios.get("http://127.0.0.1:8000/Api/index").then(function (response) {
      setProducts(response.data);
    });
  }

  return (
    <div>
      <NavButtons
        name="Product List"
        btnName1="ADD"
        btnName2="MASS DELETE"
        // linkName = "/addProduct"
        linkName2="/"
        type="button"
        btn2_id="delete-product-btn"
        delSelectedCheckBoxes={deleteCheckBoxes}
        formId=""
      />
      {products.length > 0 && // show products if array size greater than 0
        products.map((product) => {
          return (
            <Product
              key={product.sku}
              productValue={product.sku}
              productChecked={product.isChecked}
              handleChange={handleCheckBox}
              sku={product.sku}
              name={product.name}
              price={product.price + " $"}
              specificAttrbute={getSpecialAttr(product)}
            ></Product>
          );
        })}
    </div>
  );
}

export default ProductListPage;
