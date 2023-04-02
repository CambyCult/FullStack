import axios from "axios";
import { useState, useEffect } from "react";
import "./supervisor.css";
import { Modal } from "./Modal";

export function SupervisorView() {
  const [messages, setMessages] = useState([]);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);

  // MESSAGES
  const handleMessages = () => {
    axios.get("http://localhost:3000/messages.json").then((response) => {
      // console.log(response.data);
      setMessages(response.data);
    });
  };

  // renders messages on page load
  useEffect(handleMessages, []);

  //toggles messages to be visible or not
  const showMessages = () => {
    setIsMessagesVisible(true);
  };

  const hideMessages = () => {
    setIsMessagesVisible(false);
  };

  //USERS

  const [users, setUsers] = useState([]);

  const retrieveUsers = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      // console.log(response.data);
      setUsers(response.data);
    });
  };

  // renders users on page load
  useEffect(retrieveUsers, []);

  //creates an array of objects for each user and some of their attributes. This info is used in the form for assigning users to rigs.
  const usersInfo = users.map((user) => {
    const container = {};
    container.id = user.id;
    container.firstName = user.first_name;
    container.lastName = user.last_name;
    container.rigId = user.rig_id;
    return container;
  });

  // Acquire Rigs
  const [rigs, setRigs] = useState([]);
  const handleRigs = () => {
    axios.get("http://localhost:3000/rigs.json").then((response) => {
      // console.log(response.data);
      setRigs(response.data);
    });
  };
  useEffect(handleRigs, []);

  // Placing User on Rig
  const [selectUser, setSelectUser] = useState("");

  // const [isUsersVisible, setIsUsersVisible] = useState(false);
  const [isUsersVisible, setIsUsersVisible] = useState(true);

  // const handleTechs = () => {
  //   setIsUsersVisible(!isUsersVisible);
  // };

  //retrieves user_id for user clicked in form below to dynamically send patch request to that user on the backend
  const selectedUser = (event) => {
    const selected = event.target.value;
    setSelectUser(event.target.value);
  };

  const handleFieldAssign = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    console.log(event.target);

    axios
      .patch(`http://localhost:3000/users/${selectUser}.json`, params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div className="superContainer">
      <div className="titleBar">
              <h2>Welcome to the supervisor portal.</h2>
      </div>
        <div className="subContainer">
            <div className="subContainerOne">
                <button type="button" onClick={() => showMessages()}>
                  Open Messages
                </button>
                  <Modal show={isMessagesVisible} onClose={hideMessages}>
                      <div className="messages-container">
                        {messages.map((message) => (
                          <div key={message.id} className="message">
                            <p>
                              <span className="bold">date:</span> {message.date}
                            </p>
                            <p>
                              <span className="bold">shift:</span> {message.shift}
                            </p>
                            <p>
                              <span className="bold">field tech: </span>
                              {message.user_first} {message.user_last}{" "}
                            </p>
                            <p>
                              <span className="bold">message:</span> {message.content}
                            </p>
                          </div>
                        ))}
                      </div>
                  </Modal>
            </div>
            <div className="subContainerTwo">
                <div className="flexTechs">
                      <form className="assign-form" onSubmit={handleFieldAssign}>
                            <label>Tech:</label>
                            <select id="id" name="id" size="8">
                              {usersInfo.map((container) => (
                                <option
                                  value={container.id}
                                  onClick={selectedUser}
                                  key={container.id}
                                >
                                  {container.firstName}
                                </option>
                              ))}
                            </select>
                            <label>Rig:</label>
                            <select id="rig_id" name="rig_id" size="6">
                              <option value="1">Rig 1</option>
                              <option value="2">Rig 2</option>
                              <option value="3">Rig 3</option>
                              <option value="4">Rig 4</option>
                              <option value="5">Rig 5</option>
                              <option value="6">Rig 6</option>
                              <option value={null}>Unassign</option>
                            </select>

                            <button className="rig-button" type="submit">
                              Submit
                            </button>
                      </form>
                  </div>
              </div>
            <div className="subContainerThree">
                <div className="flexTechs">
                  <div className="assignments-container">
                    <h3>Current Assignments</h3>
                    <table className="assignments-table">
                      <thead>
                        <tr>
                          <th>Rig</th>
                          <th>Tech 1</th>
                          <th>Tech 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rigs.map((rig) => (
                          <tr key={rig.id}>
                            <td>{rig.id}</td>
                            <td>
                              {rig.users.length >= 1 ? rig.users[0].first_name : ""}
                            </td>
                            <td>{rig.users.length > 1 ? rig.users[1].first_name : ""}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
          <div className="bottom-Bar">test</div>
        
        
      </div>
  </div>
  );
}
