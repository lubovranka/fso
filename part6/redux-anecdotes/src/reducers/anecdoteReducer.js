import { createAnecdote, getAnecdotes } from "../services/anecdoteService";

const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

export const voteFor = (id) => {
    return {
        type: "VOTE",
        id: id,
    };
};

export const addNew = (anecdote) => {
    const anecdoteObj = asObject(anecdote);
    createAnecdote(anecdoteObj);
    return { type: "NEW", new: anecdoteObj };
};

export const setAnecdotes = (anecdotes) => ({
    type: "SET_ANECDOTES",
    anecdotes: anecdotes,
});

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "VOTE":
            return [
                state[0].map((anecdote) =>
                    anecdote.id === action.id
                        ? { ...anecdote, votes: anecdote.votes + 1 }
                        : anecdote
                ),
            ];
        case "NEW":
            /* TODO: Fix this mess */
            return [[...state[0], action.new]];
        case "SET_ANECDOTES":
            return [action.anecdotes];
        default:
            return state;
    }
};

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await getAnecdotes();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const setNewAnecdote = (anecdote) => {
    return async (dispatch) => {
        dispatch(addNew(anecdote));
    };
};

export const voteForAnecdote = (id) => {
    return async (dispatch) => {
        dispatch(voteFor(id));
    };
};

export default reducer;
