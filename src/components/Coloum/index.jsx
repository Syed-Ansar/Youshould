import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Form from "../Form";
import Task from "../Task";

const Coloum = ({ tasks, title, setData }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="border border-green-400 rounded-lg min-h-screen  h-full m-5 bg-green-100 p-5">
            <h1 className="pb-5">{title}</h1>
            <div className="flex justify-center items-center bg-green-300 rounded-md my-3 cursor-pointer" onClick={() => setShow(!show)}>+</div>
            {show && <Form setData={setData} setShow={setShow} tasks={tasks} show={show} titles={title} />}
            <Droppable droppableId={title}>
                {
                    (provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} >
                            {
                                Array.isArray(tasks) && tasks?.map((task, index) => (
                                    <Task key={task.id} task={task} index={index} />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    );
};

export default Coloum;
