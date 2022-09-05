import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification } from "../reducers/notificationReduder"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter.filter)

    const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toLowerCase().includes(filter)))
    
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(createNotification(`you voted for ${anecdote.content}`))
        dispatch(voteFor(anecdote.id))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
    } 

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList