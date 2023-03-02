import axios from "axios";

const API_URL = "api/tasks/";

const createTask = async (idList, text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + idList, { text }, config);

  return response.data;
};

const getTasks = async (idList, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + idList, config);

  return response.data;
};

const updateTask = async (idList, idTask, text, checkbox, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + idList + "/" + idTask,
    { text, checkbox },
    config
  );

  return response.data;
};

const deleteTask = async (idList, idTask, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + idList + "/" + idTask, config);
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;
