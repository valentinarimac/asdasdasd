import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="nav-bar">
      <span className="logo">To-Do App</span>
      <button className="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
