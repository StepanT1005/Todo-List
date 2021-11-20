import { tasksListSelector } from "./tasks.selectors";
import * as tasksGateway from "./tasksGateway";

export const TASKS_LIST_RECIEVED = "TASKS_LIST_RECIEVED";

const tasksListRecieved = (tasksList) => ({
  type: TASKS_LIST_RECIEVED,
  payload: { tasksList },
});

export const getTasksList = () => {
  const thunkAction = function (dispatch) {
    tasksGateway
      .fetchTasksList()
      .then((tasksList) => dispatch(tasksListRecieved(tasksList)));
  };
  return thunkAction;
};

export const updateTask = (taskId) => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    tasksGateway
      .updateTask(taskId, updatedTask)
      .then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const deleteTask = (taskId) => {
  const thunkAction = function (dispatch) {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};

export const createTask = (text) => {
  const thunkAction = function (dispatch) {
    const taskData = {
      text,
      done: false,
      createdAd: new Date().toISOString(),
    };
    tasksGateway.createTask(taskData).then(() => dispatch(getTasksList()));
  };
  return thunkAction;
};
