import React from "react";
import { MdLightMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { modeActions } from "../store/modeslice";
export default function Todoheading() {
  const mode = useSelector((store) => store.toggleMode);
  console.log(mode);
  const dispatch = useDispatch();
  const handleToggleMode = () => {
    dispatch(modeActions.toggleMode());
  };

  return (
    <div className="todoName">
      <div>TODO</div>

      <div>
        <MdLightMode
          className={`${!mode && "modetoggle"}`}
          onClick={handleToggleMode}
        />
      </div>
    </div>
  );
}
