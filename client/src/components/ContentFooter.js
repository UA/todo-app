import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCompletedTodoAsync } from '../redux/todos/services'
import {
    changeActiveFilter,
    selectTodos,
} from '../redux/todos/todosSlice'

function ContentFooter() {
    const dispatch = useDispatch()
    const items = useSelector(selectTodos)
    const activeFilter = useSelector((state) => state.todos.activeFilter)
    const itemsLeft = items.filter((item) => !item.completed).length

    useEffect(() =>{
        localStorage.setItem('activeFilter',activeFilter)
    },[activeFilter]);

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{itemsLeft}</strong> item{itemsLeft > 1 && 's'} left
            </span>

            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={activeFilter === 'all' ? 'selected' : ''}
                        onClick={() => dispatch(changeActiveFilter('all'))}
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href="#/"
                        className={activeFilter === 'active' ? 'selected' : ''}
                        onClick={() => dispatch(changeActiveFilter('active'))}
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a
                        href="#/"
                        className={
                            activeFilter === 'completed' ? 'selected' : ''
                        }
                        onClick={() =>
                            dispatch(changeActiveFilter('completed'))
                        }
                    >
                        Completed
                    </a>
                </li>
            </ul>

            <button
                className="clear-completed"
                onClick={() => dispatch(clearCompletedTodoAsync())}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter
