import Axios from "axios";
import { Tooltip } from "react-tooltip";
import { Props, Task } from "./Interfaces";

// Component
function TasksList(props: Props): JSX.Element {
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
    const updatedTasks = [...props.tasks];
    updatedTasks[i].completed = completed;
    props.setTaskState(updatedTasks[i]);
    updateTask(updatedTasks[i].id, completed); // Calls the function to update the task in the database
  };

  return (
    <div className='col-sm-12 col-md-12 '>
      {props.tasks.length ? (
        <>
          {props.tasks.map((task: Task, i: number) => (
            <a
              key={task.id}
              data-tooltip-id='my-tooltip'
              data-tooltip-content={new Date(
                task.dateCreated
              ).toLocaleString()}>
              <li className='list-group-item d-flex justify-content-between align-items-start bg-dark text-light'>
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
                    checked={false}
                  />
                )}
                <div
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                  }}
                  className='ms-3 me-auto'>
                  {task.descripcion}
                </div>

                <div className='row '>
                  <button
                    onClick={() => {
                      deleteTask(task.id);
                    }}
                    className='btn btn-danger btn-sm'>
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
}

export default TasksList;
