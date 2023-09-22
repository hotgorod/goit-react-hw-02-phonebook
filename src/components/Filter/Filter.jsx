const Filter = ({filter, onChange}) => {
    
    return (
        <label>Find contacts by name
            <input type="text" value={filter} onChange={onChange}></input>
        </label>
    )
}

export default Filter;