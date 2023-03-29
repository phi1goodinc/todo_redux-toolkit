import './App.css';
import {useState, useEffect} from "react";
import TodoList from "./components/TodoList/TodoList";
import {useAppDispatch, useAppSelector} from "./hook";
import InputField from "./components/InputField/InputField";
import {addNewTodo, fetchTodos} from "./store/todoSlice";
import Header from "./components/Header/Header";



function App() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const {status, error} = useAppSelector(state => state.todos)

  const addTask = () => {
      dispatch(addNewTodo(text));
      setText('')
  };

  useEffect(() => {
      dispatch(fetchTodos())
  },[dispatch])

  return (
    <div className="App">
        <Header/>
        <InputField text={text} handleSubmit={addTask} handleInput={setText}/>
        {status === 'loading' && <h2>Loading...</h2>}
        {status === 'rejected' && <h2>Error : {error}</h2>}
        <TodoList/>
    </div>
  );
}

export default App;
