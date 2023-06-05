import { NavBar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Thoughts from "./pages/Thoughts";
import About from "./pages/Pages";
import "./style/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
