import { useState } from "react";
import { createTask } from "../features/task/taskSlice";
import { useDispatch } from "react-redux";

function NewTask({ id }) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (text) {
      const data = {
        idList: id,
        text: text,
      };
      dispatch(createTask(data));
      setText("");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="new-task"
          type="text"
          name="text"
          id="text"
          value={text}
          placeholder="Add new task"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button" type="submit">
          +
        </button>
      </form>
    </>
  );
}

export default NewTask;
