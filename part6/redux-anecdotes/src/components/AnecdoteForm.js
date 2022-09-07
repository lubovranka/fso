import { connect } from "react-redux";
import { setNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
    const createNew = (e) => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = "";
        props.setNewAnecdote(content);
    };
    
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    );
};

const mapDispatchToProps = {
    setNewAnecdote
}

const ConnctedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnctedAnecdoteForm;
