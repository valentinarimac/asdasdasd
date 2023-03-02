import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../features/task/taskSlice";
import { useState } from "react";

function Task({ task }) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);
  const [text, setText] = useState(task.text);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      idList: task.list,
      idTask: task._id,
      text: text,
    };
    dispatch(updateTask(data));
    setUpdate(true);
  };

  const onClickCheckbox = () => {
    const data = {
      idList: task.list,
      idTask: task._id,
      checkbox: !task.checkbox,
    };
    dispatch(updateTask(data));
  };

  const deleteT = () => {
    const data = {
      idList: task.list,
      idTask: task._id,
    };
    dispatch(deleteTask(data));
  };

  return (
    <>
      {update ? (
        <div className="task">
          <section>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.checkbox}
              onClick={onClickCheckbox}
            />
            <div>{task.text}</div>
          </section>
          <section>
            <button className="task-btn" onClick={() => setUpdate(false)}>
              Update
            </button>
            <button className="task-btn" onClick={deleteT}>
              Delete
            </button>
          </section>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            id="task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="task-btn" type="submit">
            Update
          </button>{" "}
        </form>
      )}
    </>
  );
}

export default Task;
