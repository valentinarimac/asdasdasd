import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createList } from "../features/list/listSlice";

function NewList() {
  const [name, setName] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [buttonText, setButtonText] = useState(true);

  const dispatch = useDispatch();

  const showInput = () => {
    setInputVisible(!inputVisible);
    setButtonText(!buttonText);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name) {
      dispatch(createList({ name }));
      setName("");
    }
  };

  return (
    <>
      <button className="button" onClick={showInput}>
        {buttonText ? "New list" : "Colapse"}
      </button>
      {inputVisible && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Add new list"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="button" type="submit">
            Create
          </button>{" "}
        </form>
      )}
    </>
  );
}

export default NewList;
