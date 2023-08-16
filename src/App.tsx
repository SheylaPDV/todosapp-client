import "./App.css";
import Form from "./components/form/Form";

function App() {
  // LLamada al api

  return (
    <div className='container py-5'>
      <h3>To-Dos App</h3>
      <div className='content-app '>
        <div className='col-sm-12 col-md-6'>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
