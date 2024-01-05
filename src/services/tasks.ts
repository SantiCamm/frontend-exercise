import axios from "axios";

const addTask = async ({ newTask }) => {
  try {
    const response = await axios.post("http://localhost:3000/tasks", newTask);
    return response.data;
  } catch (error) {
    throw new Error("Error adding new task");
  }
};

const fetchTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/tasks");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching tasks");
  }
};

const modifyTask = async ({ task, checkedStatus }) => {
  try {
    const { id, title, description, category_id } = task;
    const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, {
      id,
      title,
      description,
      category_id,
      completed: checkedStatus,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error modifying tasks");
  }
};

export { addTask, fetchTasks, modifyTask };
