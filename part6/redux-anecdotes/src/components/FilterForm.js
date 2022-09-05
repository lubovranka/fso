import { changeFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"



const FilterForm = () => {
    const dispatch = useDispatch()

    const handleChange = e => {
        const content = e.target.value
        dispatch(changeFilter(content))
    }

    const style = {
        marginBottom: 10
      }
    return (
        <form>
            filter: <input style={style} name='filter' onChange={handleChange}/>
        </form>
    )
}

export default FilterForm