import {useAppDispatch} from "../hook";
import {removeTodo, toggleComplete} from "../store/todoSlice";
import {FC} from "react";

interface TodoItemProps {
    id: string,
    text: string,
    isComplete:boolean
}

const TodoItem: FC<TodoItemProps> = ({id, text, isComplete}) => {
    const dispatch = useAppDispatch();

    const removeTask = (id: string) => {
        dispatch(removeTodo(id))
    }
    const toggleTask = (id: string) => {
        dispatch(toggleComplete(id))
    }

    return (
        <li>
            <input type="checkbox" checked={isComplete} onChange={() => toggleTask(id)}/>
            <span>{text}</span>
            <span className="delete" onClick={() => removeTask(id)}>&times;</span>
        </li>
    )
}

export default TodoItem;