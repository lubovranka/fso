import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes, notification }) => (
    <div>
      <h2>Anecdotes</h2>
      <p>{notification}</p>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
      </ul>
    </div>
  )

export default AnecdoteList