import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {
                (provided, snapshot) => (
                    <div key={task.title} className={`bg-green-200 p-3 border border-emerald-300 rounded-md cursor-pointer my-3 ${snapshot.draggingOver ? 'border border-white' : ""}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <h1>{task.title}</h1>
                    </div>
                )
            }
        </Draggable>
    );
};

export default Task;
