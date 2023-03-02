import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteList } from "../features/list/listSlice";
import { setSelectedList } from "../features/selectedList/selectedListSlice";

function ListCard({ list }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickListCard = () => {
    dispatch(setSelectedList(list));
    navigate("/list");
  };

  return (
    <>
      <div className="list-card">
        <span className="name">{list.name}</span>
        <div>
          <button className="button" onClick={onClickListCard}>
            Open
          </button>
          <button
            className="button"
            onClick={() => dispatch(deleteList(list._id))}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ListCard;
