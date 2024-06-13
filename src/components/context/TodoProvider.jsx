import React, { useState, useReducer, useEffect } from 'react'
import { TodoContext } from './TodoContext'
import todoReducer from '../../hooks/todoReducer';
import useForm from '../../hooks/useForm'
import { v4 as uuidv4 } from 'uuid';
import useWindowSize from '../../hooks/useWindowsSize';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    const [searchTodoValue, setSearchTodoValue] = useState('');

    const { title, onChange, onResetForm } = useForm({
        title: ''
    });

    const [formMessage, setFormMessage] = useState({
        error: false,
        message: ''
    });

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [showAddMessage, setShowAddMessage] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [showButtonOpenModal, setShowButtonOpenModal] = useState(false);

    const { width } = useWindowSize(); 

    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) || []);
    }, [todos]);

    useEffect(() => {
        if ( formMessage.error ) {
            setShowErrorMessage(true);
            const timer = setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000); 

            return () => clearTimeout(timer);
        } 

        if ( !formMessage.error ) {
            setShowAddMessage(true);
            const timer = setTimeout(() => {
                setShowAddMessage(false);
            }, 5000); 

            return () => clearTimeout(timer);
        } 

    }, [formMessage]);


    useEffect(() => {
        setIsMobile(width <= 768); 

        isMobile ? setShowButtonOpenModal(true) : setShowButtonOpenModal(false)
    }, [width]);


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

    const onChangeSearchValue = (e) => {
        setSearchTodoValue(e.target.value);
    }

    const searchTodos = () => {
        return todos.filter((todo) => {
            return todo.title.toUpperCase().includes(searchTodoValue.toUpperCase());
        });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        if ( title.length <= 3 ) {
            setFormMessage({
                error: true,
                message: '❌ Debe contener al menos 4 caracteres'
            });

            setShowErrorMessage(true);
            setShowAddMessage(false)

            return formMessage;
        }

        const newTodo = {
            id: uuidv4(),
            title: title,
            done: false
        }

        setShowErrorMessage(false);

        setFormMessage({
                error: false,
                message: '✅ Se agrego todo correctamente!'
            });

        handleNewTodo(newTodo);
        onResetForm()
    }

    const onOpenModal = () => {
        setOpenModal( openModal => !openModal );
    }

    const onShowButtonOpenModal = () => {
        setShowButtonOpenModal( showButtonOpenModal => !showButtonOpenModal );
    }

    return (
        <TodoContext.Provider 
            value={
                { 
                    todos,
                    searchTodoValue,
                    handleNewTodo,
                    handleDeleteTodo,
                    handleToggleCompleteTodo,
                    total,
                    completed,
                    pending,
                    onChangeSearchValue,
                    searchTodos,
                    onFormSubmit,
                    onChange,
                    title,
                    formMessage,
                    showErrorMessage,
                    showAddMessage,
                    openModal,
                    onOpenModal,
                    onShowButtonOpenModal,
                    showButtonOpenModal,
                    isMobile
                }
            }
        >
            { children }
        </TodoContext.Provider>
    )
}

export default TodoProvider