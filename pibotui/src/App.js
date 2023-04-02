import Register from "./Register";
import { Login } from "./Login";
import Field from "./Field";
import { SupervisorView } from "./Supervisor";
import "./field.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <div></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/field" element={<Field />} />
          <Route path="/supervisor" element={<SupervisorView />} />
        </Routes>
      </BrowserRouter>

      {/* <div className="header">
          <button className="button-1" onClick="openNav()">SB</button>
          <div className="button-2"></div>
          <div className="button-3"></div>
          <div className="button-4"></div>
        </div> */}
    </main>
  );
}

export default App;


