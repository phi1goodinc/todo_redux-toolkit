import './App.css';
import {useState} from "react";
import TodoList from "./components/TodoList";
import {useAppDispatch} from "./hook";
import InputField from "./components/InputField";
import {addTodo} from "./store/todoSlice";


function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const addTask = () => {
      dispatch(addTodo(text));
      setText('')
  }

  return (
    <div className="App">
        <InputField text={text} handleSubmit={addTask} handleInput={setText}/>
        <TodoList/>
    </div>
  );
}

export default App;
