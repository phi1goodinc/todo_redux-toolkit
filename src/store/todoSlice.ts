import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Todo = {
    id: string,
    text: string,
    isComplete: boolean,
}
type TodoState = {
    list: Todo[]
}
const initialState: TodoState = {
    list: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo (state, action: PayloadAction<string>) {
            state.list.push({
                id: new Date().toISOString(),
                text: action.payload,
                isComplete: false
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.isComplete = !toggledTodo.isComplete;
            }
        },
    }
})

export const {addTodo, removeTodo, toggleComplete} = todoSlice.actions;
export const todoReducer = todoSlice.reducer
/*
export default todoSlice.reducer;*/
