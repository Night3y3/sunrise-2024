import Task from "@/model/Task";
import { handleTaskComplete } from "@/utils/fetch";
import CustomCard from "./CustomCard";
import Title from "./Title";
import React from "react";

interface TaskColumnProps {
    readonly title: string;
    readonly tasks: Task[];
    readonly className: string;
}

const TaskColumn = React.memo(
    ({
        title,
        tasks = [],
        className,
        setTasks,
        setActiveTasks,
        setCompletedTasks,
    }: TaskColumnProps & {
        setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
        setActiveTasks: React.Dispatch<React.SetStateAction<Task[]>>;
        setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    }) => {
        return (
            <div className="col-span-1 flex flex-col gap-4 py-4">
                <Title title={title} totalTasks={tasks.length} className={className} />
                <div className="grid grid-cols-2 gap-3">
                    {tasks.map((task) => (
                        <div key={task.id}>
                            <CustomCard
                                task={task}
                                disabled={title === "To-Do"}
                                handleTaskComplete={(taskTitle: string) =>
                                    handleTaskComplete(taskTitle, setTasks, setActiveTasks, setCompletedTasks)
                                }
                                columnTitle={title}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

TaskColumn.displayName = "TaskColumn";

export default TaskColumn;