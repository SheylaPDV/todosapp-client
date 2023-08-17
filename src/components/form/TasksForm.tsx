import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ListGroup from "../list/ListGroup";
import Tasks from "../tasks/Tasks";

interface Task {
  descripcion: string;
  dateCreated: number;
}

export default function Form() {
  const [task, setTask] = useState<Task>({
    descripcion: "",
    dateCreated: 0,
  });

  const [tasksList, setTasksList] = useState<Task[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const saveTask = (): void => {
    Axios.post("http://localhost:3001/v1/tasks", {
      descripcion: task.descripcion,
    })
      .then(() => {
        console.log("Task created");
      })
      .catch((error) => {
        console.error("Error al guardar la tarea:", error);
      });
  };

  const getTasks = (): void => {
    Axios.get("http://localhost:3001/v1/tasks")
      .then((res) => {
        setTasksList(res.data);
      })
      .catch((error) => {
        console.error("Error al guardar la tarea:", error);
      });
  };

  useEffect(() => {
    getTasks();
  }, [saveTask]);

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
            ></input>
          </div>{" "}
          <input className='form-control' placeholder='Filter'></input>
          <button
            onClick={() => saveTask()}
            type='button'
            className='btn btn-outline-success btn-sm btn-block'
          >
            Add Task
          </button>
        </form>
        <div className='col-sm-12 col-md-12'>
          {tasksList ? (
            <ListGroup>
              {tasksList.map((task, index) => (
                <a
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content={new Date(
                    task.dateCreated
                  ).toLocaleString()}
                >
                  <Tasks key={index} descripcion={task.descripcion} />
                </a>
              ))}
              <Tooltip id='my-tooltip' />
            </ListGroup>
          ) : (
            <h3>There is nothing to show</h3>
          )}
        </div>
      </div>
    </div>
  );
}
