import Register from "./Register";
import { Login } from "./Login";
import Field from "./Field";
import { SupervisorView } from "./Supervisor";
import "./field.css";
import { Protected } from "./Protected";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="App">
      <div></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/field"
            element={
              <Protected>
                <Field />
              </Protected>
            }
          />
          <Route path="/supervisor" element={<SupervisorView />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;


