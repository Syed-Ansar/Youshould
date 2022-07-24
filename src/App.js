import { useEffect, useState } from 'react';
import './App.css';
import Coloum from './components/Coloum';
import { Todo, completedData, Inprogress } from './components/Constants';
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useState(Todo);
  const [inprogress, setInprogress] = useState(Inprogress);
  const [completed, setCompleted] = useState(completedData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position

    let add;
    let active = todos;
    let inProgressTodo = inprogress
    let complete = completed;
    // Source Logic
    if (source.droppableId === "TODO") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "IN-PROGRESS") {
      add = inProgressTodo[source.index];
      inProgressTodo.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TODO") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "IN-PROGRESS") {
      inProgressTodo.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompleted(complete);
    setInprogress(inProgressTodo)
    setTodos(active);

    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("active", JSON.stringify(inprogress));
    localStorage.setItem("complete", JSON.stringify(completed));
  }


  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const todosList = JSON.parse(localStorage.getItem("todos"));
      const activeList = JSON.parse(localStorage.getItem("active"));
      const completeList = JSON.parse(localStorage.getItem("complete"));
      setTodos(todosList);
      setInprogress(activeList);
      setCompleted(completeList);
    }
  }, [])


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-screen h-screen">
        <h1 className='flex justify-center'>.Taskez - Todo App</h1>
        <div className='grid grid-cols-3 px-20 py-10'>
          <Coloum tasks={todos} setData={setTodos} title={'TODO'} />
          <Coloum tasks={inprogress} setData={setInprogress} title={'IN-PROGRESS'} />
          <Coloum tasks={completed} setData={setCompleted} title={'COMPLETE'} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
