import React, { useRef, useState } from "react";
import { VscAccount } from 'react-icons/vsc'
import { FiMessageSquare } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';


const Form = ({ setData, setShow, show, tasks, titles }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const focusRef = useRef(null);

    const handleSubmit = async (event) => {
        if (title && description) {
            if (event.key === "Enter") {
                const newTodo = { id: uuidv4(), title: title, desc: description, column: titles }
                tasks.push(newTodo);
                setData(tasks);
                console.log(tasks);
                setTitle('');
                setDescription('');
                setShow(!show)
            }
        }
    }
    const handleTitle = async (event) => {
        if (event.key === 'Enter') {
            await focusRef.current.focus();
        }
    }
    return (
        <div className="w-full flex flex-col flex-1 p-3 bg-white space-y-4 rounded-md">
            <form>
                <div>
                    <input
                        className="w-full outline-none text-sm font-semibold"
                        type="text"
                        placeholder="Give your task title"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={handleTitle}
                    />
                </div>
                <div>
                    <input
                        className="w-full outline-none text-xs font-medium"
                        type="text"
                        placeholder="Description..."
                        required
                        name="desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyPress={handleSubmit}
                        ref={focusRef}
                    />
                </div>
            </form>
            <div className="flex justify-between items-center">
                <VscAccount className="w-5 h-5 text-gray-400 " />
                <FiMessageSquare className="w-4 h-4 text-gray-400 " />
            </div>
        </div>
    )
};

export default Form;
