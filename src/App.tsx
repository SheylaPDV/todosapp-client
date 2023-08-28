import "./App.css";
import TasksForm from "./components/form/TasksForm";

function App() {
  return (
    <div className='container py-5 '>
      <h3 className='text-info fw-bold'>To-Dos App</h3>
      <div className='content-app '>
        <div className='col-sm-12 col-md-6 '>
          <TasksForm />
        </div>
      </div>
    </div>
  );
}

export default App;
