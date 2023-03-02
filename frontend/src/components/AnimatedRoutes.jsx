import { Routes, Route, useLocation } from "react-router-dom";
import Start from "./Start";
import Register from "./Register";
import Login from "./Login";
import NavBar from "./NavBar";
import Content from "./Content";
import List from "./List";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Start />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <NavBar /> <Content />
              </>
            }
          />
          <Route
            path="/list"
            element={
              <>
                <NavBar /> <List />
              </>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default AnimatedRoutes;
