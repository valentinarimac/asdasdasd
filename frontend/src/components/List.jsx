import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks, resetTasks } from "../features/task/taskSlice";
import { deleteList } from "../features/list/listSlice";
import NewTask from "./NewTask";
import Task from "./Task";
import { motion } from "framer-motion";

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isError, message } = useSelector((state) => state.tasks);
  const { selectedList } = useSelector((state) => state.selectedList);

  useEffect(() => {
    if (!Object.keys(selectedList).length) {
      navigate("/home");
    } else dispatch(getTasks(selectedList._id));

    return () => {
      dispatch(resetTasks());
    };
  }, [dispatch, isError, message, selectedList, navigate]);

  const onClick = () => {
    dispatch(deleteList(selectedList._id));
    navigate("/home");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="list"
    >
      <span>{selectedList.name}</span>

      <NewTask id={selectedList._id} />
      {tasks.length > 0 ? (
        <div className="tasks">
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <h1 className="make-new">Make new tasks</h1>
      )}
      <button className="button" onClick={onClick}>
        Delete list
      </button>
    </motion.div>
  );
}

export default List;
