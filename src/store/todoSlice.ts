import {createSlice, PayloadAction, createAsyncThunk, AnyAction} from "@reduxjs/toolkit";

type Todo = {
    id: string,
    title: string,
    completed: boolean,
}
type TodoState = {
    list: Todo[],
    status: null | string,
    error: any,
    date: Date,
}
const initialState: TodoState = {
    list: [],
    status: null,
    error: null,
    date: new Date(),
}


export const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15 ');

        if (!response.ok) {
            return rejectWithValue('Server error!');
        }

        return await response.json();
    }
);

export const deleteTodo = createAsyncThunk<string, string, { rejectValue: string }>(
    'todos/deleteTodo',
    async function (id: string, {rejectWithValue}) {

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            return rejectWithValue("Can't delete task");
        }
        return id;
    });

export const toggleStatus = createAsyncThunk<Todo, string, { rejectValue: string, state: { todos: TodoState } }>(
    'todos/toggleStatus',
    async function (id: string, {rejectWithValue, getState}) {
        const todo = getState().todos.list.find(todo => todo.id === id);
        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    body: JSON.stringify({
                        completed: !todo.completed,
                    })
                }
            });
            if (!response.ok) {
                return rejectWithValue("Can't toggle status of task");
            }

            return (await response.json()) as Todo;
        }

        return rejectWithValue("No such todo");
    }
);


export const addNewTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
    'todos/addNewTodo',
    async function (text, {rejectWithValue}) {
        let toDo = {
            id: 1,
            title: text,
            completed: false,
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDo)
        });

        if (!response.ok) {
            return rejectWithValue("Can't toggle status of task");
        }

        const data = await response.json();

        return data as Todo;
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.list = action.payload;
        })
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        })
        builder.addCase(addNewTodo.fulfilled, (state, action) => {
            state.list.push(action.payload);
        })

        builder.addCase(toggleStatus.fulfilled, (state, action) => {
            const toggledTodo = state.list.find(todo => todo.id === action.payload.id);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.list = state.list.filter(todo => todo.id !== action.payload);
        })
        builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload;
                state.status = 'rejected';
            });

    },
})

export const todoReducer = todoSlice.reducer;

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

