import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { createNewNotification } from "../reducers/notificationReduder";

const AnecdoteList = () => {
    const filterValue = useSelector((state) =>
        state.filter.filter.toLowerCase()
    );

    const anecdotes = useSelector((state) => {
        if (filterValue) {
            return state.anecdotes[0].filter((anecdote) =>
                anecdote.content.toLowerCase().includes(filterValue)
            );
        }
        return state.anecdotes[0];
    });
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote.id));
        dispatch(
            createNewNotification(`you voted for ${anecdote.content}`, 1000)
        );
    };

    if (!anecdotes) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;
