import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function NavButtons(props) {
  const navigate = useNavigate();

  function sendForm(event) {
    if (event.target.type === "button") {
      // ADD button has type of "button"aand navigate it into //addProduct path
      navigate("/addProduct");
    }
  }

  function massDeleteFunc() {
    props.delSelectedCheckBoxes();
  }
  return (
    <div className="row product-list-group">
      <div className="col-10">
        <span className="product-list-span">{props.name}</span>
      </div>
      <div className="col-2 ">
        <button
          form={props.formId}
          type={props.type}
          onClick={sendForm}
          className="btn btn-outline-dark"
        >
          {props.btnName1}
        </button>

        <Link to={props.linkName2}>
          <button
            id={props.btn2_id}
            onClick={massDeleteFunc}
            type="button"
            className="btn btn-outline-dark ml-3"
          >
            {props.btnName2}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NavButtons;
