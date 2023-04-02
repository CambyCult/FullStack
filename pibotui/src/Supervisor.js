import axios from "axios";
import { useState, useEffect } from "react";
import "./supervisor.css";

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
  const handleVisibleMessages = () => {
    setIsMessagesVisible(!isMessagesVisible);
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

    return container;
  });

  // Placing User on Rig

  const [selectUser, setSelectUser] = useState("");

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
                    {!isMessagesVisible ? (
                      <button type="button" className="messageButton" onClick={() => handleVisibleMessages()}>
                        Open Messages
                      </button>
                    ) : (
                      <button type="button" className="messageButton" onClick={() => handleVisibleMessages()}>
                        Close Messages
                      </button>
                    )}
                    {!isMessagesVisible ? (
                      <></>
                    ) : (
                      <div className="messages-container">
                        {messages.map((message) => (
                          <div key={message.id}>
                            <h3>date: {message.date}</h3>
                            <h4>shift: {message.shift}</h4>
                            <h4>field tech: {message.user_id}</h4>
                            <h5>message: {message.content}</h5>
                          </div>
                        ))}
                      </div>
                    )}
            </div>
            <div className="subContainerTwo">
                        <form onSubmit={handleFieldAssign}>
                          <label>Tech:</label>
                          <select id="id" name="id" size="8">
                            {usersInfo.map((container) => (
                              <option value={container.id} onClick={selectedUser}>
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
                          </select>
                          <button type="submit" className="submitButton">Submit</button>
                        </form>
              </div>
            <div className="subContainerThree"></div>
          <div className="bottom-Bar">test</div>
        
        
      </div>
  </div>
  );
}
