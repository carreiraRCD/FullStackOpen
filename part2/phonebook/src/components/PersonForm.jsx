const PersonForm = ({onSubmit, valueName, valueNumber, onChangeName, onChangeNumber}) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            Name: <input value={valueName} onChange={onChangeName}/>
            </div>
            <div>
            Number: <input value={valueNumber} onChange={onChangeNumber}/>
            </div>
            <div>
            <button type="submit">ADD</button>
            </div>
        </form>
    )
    
}

export default PersonForm