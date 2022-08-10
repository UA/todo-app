import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync, toggleTodoAsync, removeTodoAsync } from '../redux/todos/services'
import { selectFilteredTodos } from '../redux/todos/todosSlice'
import Error from './Error'
import Loading from './Loading'

function TodoList() {
    const dispatch = useDispatch()
    const filteredTodos = useSelector(selectFilteredTodos)
    const isLoading = useSelector((state) => state.todos.isLoading)
    const error = useSelector((state) => state.todos.error)

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch])

  
    const handleDestroy = async (id) => {
        if (window.confirm('Are you sure?')) {
            await dispatch(removeTodoAsync(id))
        }
    }

    const handleToogle = async (id, completed) => {
        await dispatch(toggleTodoAsync({id, data: {completed}}))
    }

    if(isLoading){
        return <Loading />
    }

    if(error){
        return <Error message={error} />
    }

    return (
        <ul className="todo-list">
            {filteredTodos.map((item) => (
                <li key={item.id} className={item.completed ? 'completed' : ''}>
                    <div className="view">
                        <input
                            name="toogle"
                            className="toggle"
                            type="checkbox"
                            onChange={() => handleToogle(item.id, !item.completed)}
                            checked={item.completed}
                        />
                        <label>{item.title}</label>
                        <button
                            className="destroy"
                            onClick={() => handleDestroy(item.id)}
                        ></button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default TodoList
