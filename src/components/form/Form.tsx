import React, { useState } from "react";

interface Task {
  Description: string;
}

export default function Form() {
  const [task, setTask] = useState<Task>({
    Description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const saveTask = async () => {
    // Lógica para guardar la tarea
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTask();
  };

  return (
    <div className='card'>
      <div className='card-header'>Add Task</div>
      <div className='card-body'>
        <form action='' onSubmit={onSubmit}>
          <div className='form-group mb-3'>
            <textarea
              onChange={handleChange}
              name='Description'
              placeholder='Task content'
              className='form-control'
              cols={30}
              rows={10}
            ></textarea>
          </div>{" "}
          <input className='form-control' placeholder='Filter'></input>
          <button
            type='submit'
            className='btn btn-outline-success btn-sm btn-block'
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
