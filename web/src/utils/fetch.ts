import Task from "@/model/Task";
import axios from "axios";

export async function fetchTasks() {
  try {
    const response = await axios.get("/api/tasks/get_non_active_tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks", error);
  }
}
export async function fetchActiveTasks() {
  try {
    const response = await axios.get("/api/tasks/get_active");
    return response.data;
  } catch (error) {
    console.error("Error fetching active tasks", error);
  }
}

export async function fetchCompletedTasks() {
  try {
    const response = await axios.get("/api/tasks/get_completed_tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching completed tasks", error);
  }
}
export async function handleTaskComplete(
  taskTitle: string,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  try {
    await axios.put("/api/tasks/get_completed_tasks", { taskTitle });
    const [allTasks, active, completed] = await Promise.all([
      fetchTasks(),
      fetchActiveTasks(),
      fetchCompletedTasks(),
    ]);
    setTasks(allTasks);
    setActiveTasks(active);
    setCompletedTasks(completed);
  } catch (error) {
    console.error("Error completing task:", error);
  }
}
