import React from "react";

interface TitleProps {
    readonly title: string;
    readonly totalTasks: number;
    readonly className: string;
}

const Title = React.memo(({ title, totalTasks, className }: TitleProps) => {
    return (
        <div className="flex">
            <h4 className="font-semibold text-black">{title}</h4>
            <span className={`rounded-full px-2 ml-2 ${className}`}>
                {totalTasks}
            </span>
        </div>
    );
});

Title.displayName = "Title";

export default Title;