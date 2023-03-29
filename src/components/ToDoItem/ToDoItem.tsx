import {useAppDispatch} from "../../hook";
import {deleteTodo, toggleStatus} from "../../store/todoSlice";
import {FC} from "react";
import css from './ToDoItem.module.css'

interface TodoItemProps {
    id: string,
    title: string,
    completed:boolean
}

const TodoItem: FC<TodoItemProps> = ({id, title, completed}) => {
    const dispatch = useAppDispatch();

    const removeTask = (id: string) => {
        dispatch(deleteTodo(id))
    }
    const toggleTask = (id: string) => {
        dispatch(toggleStatus(id))
    }

    return (
        <li className={css.one_task}>
            <span  className={completed ? css.task_done : css.none} onClick={() => toggleTask(id)}>{title}</span>
            <img src={require('../../images/delete.png')} className={css.delete} alt={'delete task'}
                 onClick={() => removeTask(id)}/>
        </li>
    )
};

export default TodoItem;