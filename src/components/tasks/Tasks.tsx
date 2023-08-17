import React from "react";

interface TasksProps {
  descripcion: string;
}

const Tasks: React.FC<TasksProps> = (props) => {
  return (
    <li className=' list-group-item d-flex justify-content-between align-items-start '>
      <input type='checkbox' />
      <div className='ms-2 me-auto'> {props.descripcion}</div>
      <div className='row'>
        <button className='btn btn-info btn-sm mb-1'>Edit</button>
        <button className='btn btn-outline-danger btn-sm'>Delete</button>
      </div>
    </li>
  );
};

export default Tasks;
