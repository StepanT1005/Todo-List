import React, { useState } from "react";
import PropTypes from "prop-types";
import * as tasksAction from "../tasks.actions";
import { connect } from "react-redux";

const CreateTaskInput = ({ onCreate }) => {
  const [inputValue, setInputValue] = useState("");
  const handleCreate = () => {
    onCreate(inputValue);
    setInputValue("");
  };

  return (
    <div className="create-task">
      <input
        type="text"
        className="create-task__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="create-task__btn btn" onClick={handleCreate}>
        Create
      </button>
    </div>
  );
};

CreateTaskInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

const mapDispatch = { onCreate: tasksAction.createTask };

export default connect(null, mapDispatch)(CreateTaskInput);
