import { createSlice } from "@reduxjs/toolkit";

const initialState = { filter: '' }
const filterReducer = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action) {
            const filter = action.payload
            return {...state, filter: filter}
        }
    }
})

export const { changeFilter } = filterReducer.actions
export default filterReducer