import { useEffect, useReducer } from 'react';
import todoReducer from '../hooks/todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

const useTodo = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) || []);
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = {
            type: 'add',
            payload: todo,
        };

        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        const action = {
            type: 'delete',
            payload: id,
        };

        dispatch(action);
    };

    const handleToggleCompleteTodo = (id) => {
        const action = {
            type: 'toggleComplete',
            payload: id,
        };

        dispatch(action);
    };

    const total = (todos) => {
        return todos.length;
    };

    const completed = (todos) => {
        return todos
            .filter((todo) => todo.done)
            .map((todo) => ({
                id: todo.id,
                title: todo.title,
                done: todo.done,
            })).length;
    };

    const pending = (todos) => {
        return todos
            .filter((todo) => !todo.done)
            .map((todo) => ({
                id: todo.id,
                title: todo.title,
                done: todo.done,
            })).length;
    };

    const searchTodos = (searchTodo) => {
        return todos.filter((todo) => {
            return todo.title.includes(searchTodo);
        });
    };

    return {
        todos,
        total,
        pending,
        completed,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleCompleteTodo,
        searchTodos,
    };
};

export default useTodo;
