import background from "../images/background.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Start() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="start-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="overlay"></div>
      <img src={background} alt="" />
      <div className="start">
        <span className="todo">To-Do App</span>
        <div>
          <button className="button" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Start;
