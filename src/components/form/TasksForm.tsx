import React, { useEffect, useState } from "react";
import Axios from "axios";
import TasksList from "./TasksList";

// Defines the shape of a task object
interface Task {
  id: number;
  descripcion: string;
  dateCreated: number;
}

// Main component
export default function TasksForm() {
  // Status for the current task
  const [task, setTask] = useState<Task>({
    id: 0,
    descripcion: "",
    dateCreated: Date.now(),
  });

  // Status for the task list
  const [tasksList, setTasksList] = useState<Task[]>([]);

  // Function to handle the change in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Function to save a new task on the server
  const saveTask = (newTask: Task): void => {
    Axios.post("http://localhost:3001/v1/tasks", {
      descripcion: newTask.descripcion,
    })
      .then(() => {
        console.log("Task created");
      })
      .catch((error) => {
        console.error("Error when saving the task:", error);
      });
  };

  // Function to obtain the list of tasks from the server
  const getTasks = (): void => {
    Axios.get("http://localhost:3001/v1/tasks")
      .then((res) => {
        setTasksList(res.data);
      })
      .catch((error) => {
        console.error("Error when loading tasks:", error);
      });
  };

  // Effect to load the task list when the component is mounted or when a new task is added
  useEffect(() => {
    getTasks();
  }, [saveTask]);

  // Renders the component
  return (
    <div className='card'>
      <div className='card-header'>Add Task</div>
      <div className='card-body'>
        <form action=''>
          <div className='form-group mb-3'>
            <input
              onChange={(e) => handleChange(e)}
              name='descripcion'
              placeholder='Task content'
              className='form-control'
              value={task.descripcion}
            />
          </div>
          <input className='form-control mb-' placeholder='Filter' />
          <button
            onClick={() => saveTask(task)}
            type='button'
            className='btn btn-outline-success btn-sm btn-block '
          >
            Add Task
          </button>
        </form>
        <TasksList tasks={tasksList} />
      </div>
    </div>
  );
}