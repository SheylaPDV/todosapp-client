import React, { useState } from "react";
import Axios from "axios";

interface Task {
  descripcion: string;
}

export default function Form() {
  const [task, setTask] = useState<Task>({
    descripcion: "",
  });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setTask((prevTask) => ({
  //     ...prevTask,
  //     [name]: value,
  //   }));
  // };

  const saveTask = (): void => {
    Axios.post("http://localhost:3001/v1/tasks", {
      descripcion: task.descripcion,
    })
      .then(() => {
        alert("Task created");
      })
      .catch((error) => {
        console.error("Error al guardar la tarea:", error);
      });
  };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   saveTask(task.descripcion);
  // };

  return (
    <div className='card'>
      <div className='card-header'>Add Task</div>
      <div className='card-body'>
        <form action=''>
          <div className='form-group mb-3'>
            <input
              onChange={(e) =>
                setTask({ ...task, descripcion: e.target.value })
              }
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
      </div>
    </div>
  );
}
