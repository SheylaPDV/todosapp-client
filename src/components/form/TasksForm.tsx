import React, { useEffect, useState } from "react";
import Axios from "axios";
import TasksList from "./TasksList";
import { Task } from "./Interfaces";

// Main component
function TasksForm() {
  // Status for the task list
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const [filter, setFilter] = useState<string>("");

  // Status for the current task
  const [task, setTask] = useState<Task>({
    id: 0,
    descripcion: "",
    dateCreated: Date.now(),
    completed: false,
  });

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

  // Filters
  const filteredTasks = tasksList.filter((task) =>
    task.descripcion.toLowerCase().includes(filter.toLowerCase())
  );

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

  // Function to save a new task on the server
  const saveTask = (newTask: Task): void => {
    Axios.post("http://localhost:3001/v1/tasks", {
      descripcion: newTask.descripcion,
    })
      .then(() => {
        console.log("Task created");
        setTask({
          id: 0,
          descripcion: "",
          dateCreated: Date.now(),
          completed: false,
        });
      })
      .catch((error) => {
        console.error("Error when saving the task:", error);
      });
  };

  // Save the new task when submitting the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveTask(task);
  };

  // Effect to load the task list when the component is mounted or when a new task is added
  useEffect(() => {
    getTasks();
  }, [filteredTasks]);

  // Renders the component
  return (
    <div className='card bg-dark'>
      <div className='card-header text-info'>Add Task</div>
      <div className='card-body'>
        <form onSubmit={handleSubmit} action=''>
          <div className='form-group mb-3'>
            <div className='input-group input-group-sm mb-3 '>
              <span
                className='input-group-text bg-dark text-info'
                id='inputGroup-sizing-default'>
                Description
              </span>
              <input
                onChange={(e) => handleChange(e)}
                name='descripcion'
                placeholder='Task content'
                value={task.descripcion}
                type='text'
                className='form-control bg-dark'
                aria-label='Sizing example input'
                aria-describedby='inputGroup-sizing-default'
              />
            </div>

            <button
              type='submit'
              className='btn btn-outline-success btn-sm btn-block '>
              Add Task
            </button>
          </div>

          <input
            className='form-control mb-3 bg-dark'
            placeholder='Filter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <TasksList setTaskState={setTask} tasks={filteredTasks} />
      </div>
    </div>
  );
}

export default TasksForm;
