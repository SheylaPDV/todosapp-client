import "./App.css";
import Form from "./components/form/Form";

function App() {
  // LLamada al api

  return (
    <div className='container py-5'>
      <h3>To-Do App</h3>
      <div className='content-app '>
        <div className='row '>
          <div className='col-sm-12 col-md-4'>
            <Form />
          </div>
          <div className='col-sm-12 col-md-8'>
            {/* Listar las tareas aqui */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
