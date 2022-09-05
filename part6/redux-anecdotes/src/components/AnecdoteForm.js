import { useDispatch } from "react-redux"
import { addNew } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createNew = e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addNew(content))
    }

    return (
        <>
        <h2>create new</h2>
        <form onSubmit={createNew}>
            <div><input name='anecdote'/></div>
            <button>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm