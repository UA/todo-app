import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoAsync } from '../redux/todos/services'
import Error from './Error'
import Loading from './Loading'

function Form() {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading)
    const error = useSelector((state) => state.todos.addNewTodo.error)

    const handleSubmit = async (e) => {
        if (!title) return
        e.preventDefault()
        await dispatch(addTodoAsync({ title }))
        setTitle('')
    }

    
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                autoFocus
            />
            {isLoading && <Loading />}
            {error && <Error message={error} />}
        </form>
    )
}

export default Form
