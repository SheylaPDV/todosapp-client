import Axios from "axios";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import TasksForm from "./TasksForm";

interface Task {
  id: number;
  descripcion: string;
  dateCreated: number;
}

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = ({ tasks }) => {
  // Function to delete a task
  const deleteTask = (id: number): void => {
    Axios.delete(`http://localhost:3001/v1/tasks/${id}`)
      .then(() => {})
      .catch((err: string) => {
        console.log(err);
      });
  };

  const updateTask = (id: number): void => {
    Axios.put(`http://localhost:3001/v1/tasks/${id}`)
      .then(() => {})
      .catch((err: string) => {
        console.log(err);
      });
  };

  return (
    <div className='col-sm-12 col-md-12'>
      {tasks.length ? (
        <>
          {tasks.map((task, index) => (
            <a
              key={task.dateCreated}
              data-tooltip-id='my-tooltip'
              data-tooltip-content={new Date(task.dateCreated).toLocaleString()}
            >
              <li className='list-group-item d-flex justify-content-between align-items-start'>
                <input type='checkbox' />
                <div className='ms-3 me-auto'> {task.descripcion}</div>
                <div className='row '>
                  <button className='btn btn-info btn-sm mb-1'>Edit</button>
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
