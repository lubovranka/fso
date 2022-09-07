import { changeFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const FilterForm = (props) => {

    const handleChange = (e) => {
        const content = e.target.value;
        props.changeFilter(content);
    };

    const style = {
        marginBottom: 10,
    };
    return (
        <form>
            filter:{" "}
            <input style={style} name="filter" onChange={handleChange} />
        </form>
    );
};

const mapDispatchToProps = {
    changeFilter
}

const ConnectedFilterForm = connect(null, mapDispatchToProps)(FilterForm)
export default ConnectedFilterForm;
