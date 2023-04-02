import { useState, useEffect } from "react";
import "react-tabulator/css/tabulator.css";
import { ReactTabulator } from "react-tabulator";
import "./field.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Modal } from "./Modal";

function Field() {
  const jwt = localStorage.getItem("jwt");

  // for extracting user_id
  const decoded = jwt_decode(jwt);

  var date = new Date();

  // Modifies date format to be compatible with Message form date input field
  var currentDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
    .toISOString()
    .replace(/.\d+Z$/g, "")
    .split("T")
    .join("T");

  //toggles Message draft area
  const [isInputVisible, setIsInputVisible] = useState(false);

  const showMessages = () => {
    setIsInputVisible(true);
  };
  const hideMessages = () => {
    setIsInputVisible(false);
  };

  //Submits data for Message
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/messages.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        setIsInputVisible(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // Find Rig User is On
  const [username, setUsername] = useState("");
  const handleRig = () => {
    axios
      .get(`http://localhost:3000/users/${decoded.user_id}.json`)
      .then((response) => {
        localStorage.setItem("rig", response.data.rig_id);
        setUsername(response.data.first_name);
      });
  };

  useEffect(handleRig);

  const userRig = localStorage.getItem("rig");

  // Retrieving checklist for this Rig/User

  const [checklist, setChecklist] = useState({});
  const handleChecklist = () => {
    setChecklist("");
    axios
      .get(`http://localhost:3000/checklists/${userRig}.json`)
      .then((response) => {
        console.log(response.data);
        setChecklist({ ...response.data });
      });
  };
  useEffect(handleChecklist, []);

  //Tabulator

  const columns = [
    { title: "Item", field: "item", width: 300, responsive: 0 },
    {
      title: "Is Done",
      field: "is_done",
      editor: "tickCross",
      editable: true,
      editorParams: {
        trueValue: true,
        falseValue: false,
        tristate: false,
        elementAttributes: {
          maxlength: "10", //set the maximum character length of the input element to 10 characters
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
    {
      title: "Min. Stock",
      field: "min_stock",
      editor: "number",
      editorParams: {
        min: 0,
        max: 20,
        elementAttributes: {
          maxlength: "20",
        },
      },
      widthGrow: 1,
      responsive: 0,
    },
    // { title: "reqStock", field: "reqStock", widthGrow: 1, responsive: 1 },
  ];

  var data = [
    {
      id: 1,
      item: `${Object.keys(checklist)[2]}`,
      is_done: `${checklist.exterior_clean}`,
      // stock: 2,
      // reqStock: 4,
    },
    {
      id: 2,
      item: `${Object.keys(checklist)[4]}`,
      is_done: null,
      // stock: 3,
      min_stock: `${checklist.cones_min}`,
    },
    { id: 3, item: "Bandaids", size: 4, stock: 7, reqStock: 12 },
    { id: 4, item: "Whole-Blood", size: "O-", stock: 3, reqStock: 9 },
  ];

  return (
    <div className="App">
      <h4 className="welcome">Welcome, {username.toUpperCase()}</h4>
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
          <button type="button" onClick={handleChecklist}>
            Reset Rig {userRig} Checklist
          </button>
          <button type="button" onClick={showMessages}>
            Send A Message
          </button>
          <Modal show={isInputVisible} onClose={hideMessages}>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="user_id"
                defaultValue={decoded.user_id}
              ></input>
              <input
                type="hidden"
                name="date"
                defaultValue={currentDateTime}
              ></input>
              <div>Shift:</div>
              <div className="flex-shifts">
                <div>
                  <input type="radio" name="shift" value="first"></input>
                  <label>First</label>
                </div>
                <div>
                  <input type="radio" name="shift" value="second"></input>
                  <label>Second</label>
                </div>
              </div>
              <div>Message:</div>
              <textarea
                type="textarea"
                cols="25"
                rows="5"
                name="content"
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </Modal>
        </div>
        <div className="bottom-Bar">Field Tech Portal</div>
      </header>
    </div>
  );
}

export default Field;