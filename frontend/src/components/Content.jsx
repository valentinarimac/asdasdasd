import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLists, resetLists } from "../features/list/listSlice";
import ListCard from "./ListCard";
import NewList from "./NewList";
import { motion } from "framer-motion";

function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.lists);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getLists());
    return () => {
      dispatch(resetLists());
    };
  }, [user, navigate, dispatch]);

  return (
    <div className="content">
      <div id="greeting">Hello, {user.name}! </div>
      <NewList />

      {lists.length > 0 ? (
        <div className="lists">
          {lists.map((list) => (
            <ListCard key={list._id} list={list} />
          ))}
        </div>
      ) : (
        <h1 className="make-new">Make new list</h1>
      )}
    </div>
  );
}

export default Content;
