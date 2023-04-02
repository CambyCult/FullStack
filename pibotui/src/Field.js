import { useState, useEffect } from "react";
import "react-tabulator/css/tabulator.css";
import { ReactTabulator } from "react-tabulator";
import "./field.css";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Field() {
  const columns = [
    { title: "Item", field: "item", width: 300, responsive: 0 },
    { title: "Size", field: "size", widthGrow: 1, responsive: 0 },
    { title: "Stock", field: "stock", widthGrow: 1, responsive: 0 },
    { title: "reqStock", field: "reqStock", widthGrow: 1, responsive: 1 },
  ];
  var data = [
    { id: 1, item: "Nasal Cannula", size: "Adult", stock: 1, reqStock: 4 },
    { id: 2, item: "Nasal Cannula", size: "Pedi", stock: 3, reqStock: 4 },
    { id: 3, item: "Bandaids", size: 4, stock: 7, reqStock: 12 },
    { id: 4, item: "Whole-Blood", size: "O-", stock: 3, reqStock: 9 },
  ];

  const jwt = localStorage.getItem("jwt");
  const decoded = jwt_decode(jwt);

  // console.log(decoded.user_id);

  //Message Handling
  // const currentDateTime = new Date().toLocaleString();
  // console.log(currentDateTime);
  var date = new Date();
  var currentDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace(/.\d+Z$/g, "")
    .split("T")
    .join("T");

  // console.log(currentDateTime);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const handleMessages = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/messages.json", params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <ReactTabulator
            maxheight={"100%"}
            maxwidth={"75%"}
            data={data}
            columns={columns}
            layout={"fitDataFill"}
            layoutColumnsOnNewData={"true"}
            responsiveLayout={"collapse"}
            textDirection={"rtl"}
          />
        </div>
        <div className="container2">
          <button type="button" onClick={handleMessages}>
            Send A Message
          </button>
          {isInputVisible ? (
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="user_id"
                defaultValue={decoded.user_id}
              ></input>
              {/* <label>date</label> */}
              <input
                type="hidden"
                name="date"
                defaultValue={currentDateTime}
                // placeholder={currentDateTime}
              ></input>
              <div>Shift:</div>

              <label>
                First
                <input type="radio" name="shift" value="first"></input>
              </label>
              <label>
                Second
                <input type="radio" name="shift" value="second"></input>
              </label>
              <label>
                Third
                <input type="radio" name="shift" value="third"></input>
              </label>
              <div>Message:</div>
              <textarea
                type="textarea"
                cols="25"
                rows="5"
                name="content"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <></>
          )}
        </div>
        <div className="bottom-Bar">test</div>
      </header>
    </div>
  );
}

export default Field;

