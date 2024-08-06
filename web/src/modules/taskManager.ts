import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
  const firstGroupTasks = tasks.filter((task) => task.group === 1);
  firstGroupTasks.forEach((task) => {
    task.completed = false;
  });
  const secondGroupTasks = tasks.filter((task) => task.group === 2);
  secondGroupTasks.slice(0, 2).forEach((task) => {
    task.completed = false;
  });
}

export function getActiveTasks(): Task[] {
  const incompleteTaskGroup = Math.min(
    ...tasks.filter((task) => !task.completed).map((task) => task.group)
  );
  return tasks.filter(
    (task) => !task.completed && task.group === incompleteTaskGroup
  );
}

export function getCompletedTasks(): Task[] {
  const completedTasks = tasks.filter((task) => task.completed);
  return completedTasks;
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find((task) => task.title === taskTitle);
  if (task) {
    task.completed = true;
    const nextTaskInGroup = tasks.find(
      (t) => t.group === task.group && !t.completed
    );
    if (!nextTaskInGroup) {
      const nextGroupTasks = tasks.filter((t) => t.group === task.group + 1);
      if (nextGroupTasks.length > 0) {
        nextGroupTasks.slice(0, 2).forEach((t) => {
          t.completed = false;
        });
      }
    }
  }
}

export function createTask(
  title: string,
  description: string,
  persona: string,
  group: number
): void {
  const newTask = new Task(
    tasks.length + 1,
    title,
    description,
    persona,
    group
  );
  tasks.push(newTask);
}

export function updateTask(
  taskId: number,
  updatedTask: Partial<Omit<Task, "id">>
): void {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter((task) => task.id !== taskId);
}

export function getNonRegisteredTasks(): Task[] {
  const activeTasks = tasks.filter((task) => !task.completed);
  const sortedTasks = activeTasks.toSorted((a, b) => a.group - b.group);
  const topGroupNumber = sortedTasks[0].group;
  const filteredTasks = sortedTasks.filter(
    (task) => task.group !== topGroupNumber
  );
  return filteredTasks;
}
