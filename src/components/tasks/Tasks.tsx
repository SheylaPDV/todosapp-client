import React from "react";

interface TasksProps {
  title: string;
  content: string;
}

const Tasks: React.FC<TasksProps> = (props) => {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-start '>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>{props.title}</div>
        {props.content}
      </div>
      <div className='row'>
        <button className='btn btn-info btn-sm mb-1'>Edit</button>
        <button className='btn btn-outline-danger btn-sm'>Delete</button>
      </div>
    </li>
  );
};

export default Tasks;
