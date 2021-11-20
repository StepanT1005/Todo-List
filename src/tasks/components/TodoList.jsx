import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as tasksAction from "../tasks.actions";
import { sortedTasksListSelector } from "../tasks.selectors";
import { connect } from "react-redux";
import CreateTaskInput from "./CreateTasksInput";
import TasksList from "./TasksList";

const TodoList = ({ getTasksList, tasks, updateTask, deleteTask }) => {
  useEffect(() => {
    getTasksList();
  }, [getTasksList]);
  return (
    <>
      <h1 className="title">Todo List</h1>
      <main className="todo-list">
        <CreateTaskInput />
        <TasksList
          tasks={tasks}
          handleTaskStatusChange={updateTask}
          handleTaskDelete={deleteTask}
        />
      </main>
    </>
  );
};

TodoList.propTypes = {
  getTasksList: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const mapState = (state) => ({ tasks: sortedTasksListSelector(state) });
const mapDispatch = {
  getTasksList: tasksAction.getTasksList,
  updateTask: tasksAction.updateTask,
  deleteTask: tasksAction.deleteTask,
};

export default connect(mapState, mapDispatch)(TodoList);
