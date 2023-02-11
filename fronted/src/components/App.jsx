import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductListPage from "./ProductListPage";
import AddProductPage from "./AddProductPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListPage />} />

          <Route path="/addProduct" element={<AddProductPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
