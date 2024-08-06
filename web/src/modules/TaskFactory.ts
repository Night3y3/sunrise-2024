import Task from "@/model/Task";

export default class TaskFactory {
  static createTask(
    id: number,
    title: string,
    description: string,
    persona: string,
    group: number
  ): Task {
    return new Task(id, title, description, persona, group);
  }
}
