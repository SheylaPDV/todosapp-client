import Axios from "axios";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";

interface Task {
  id: number;
  descripcion: string;
  dateCreated: number;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  setTaskState: React.Dispatch<React.SetStateAction<Task>>;
}

const TasksList: React.FC<Props> = ({ tasks, setTaskState }) => {
  // Function to delete a task
  const deleteTask = (id: number): void => {
    Axios.delete(`http://localhost:3001/v1/tasks/${id}`)
      .then(() => {})
      .catch((err: string) => {
        console.log(err);
      });
  };

  // Function to update a task in the database
  const updateTask = (id: number, completed: boolean): void => {
    Axios.put(`http://localhost:3001/v1/tasks/${id}`, { completed: completed })
      .then(() => {})
      .catch((err: string) => {
        console.log(err);
      });
  };

  // Function to change the completed status of a task
  const toggleDoneTask = (i: number, completed: boolean): void => {
    const updatedTasks = [...tasks];
    updatedTasks[i].completed = completed;
    setTaskState(updatedTasks[i]);
    updateTask(updatedTasks[i].id, completed); // Calls the function to update the task in the database
  };

  return (
    <div className='col-sm-12 col-md-12'>
      {tasks.length ? (
        <>
          {tasks.map((task: Task, i: number) => (
            <a
              key={task.id}
              data-tooltip-id='my-tooltip'
              data-tooltip-content={new Date(task.dateCreated).toLocaleString()}
            >
              <li className='list-group-item d-flex justify-content-between align-items-start'>
                {task.completed ? (
                  <input
                    type='checkbox'
                    onChange={() => toggleDoneTask(i, false)}
                    checked
                  />
                ) : (
                  <input
                    type='checkbox'
                    onChange={() => toggleDoneTask(i, true)}
                  />
                )}
                <div
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                  }}
                  className='ms-3 me-auto'
                >
                  {task.descripcion}
                </div>

                <div className='row '>
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                    className='btn btn-danger btn-sm'
                  >
                    Delete
                  </button>
                </div>
              </li>
            </a>
          ))}
          <Tooltip id='my-tooltip' />
        </>
      ) : (
        <h5>There is nothing to show</h5>
      )}
    </div>
  );
};

export default TasksList;
