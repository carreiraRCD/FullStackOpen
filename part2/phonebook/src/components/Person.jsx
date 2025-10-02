import Button from './Button'

const Person = ({name, number, onClicked}) => {
    return(
        <p>{name} {number} <Button onClick={onClicked} text={"Delete"}/></p>
    )
}

const Persons = ({persons, onClicked}) => {
    return(
        persons.map(person => <Person key={person.id} name={person.name} number={person.number} onClicked={()=> onClicked(person)}/>)
    )
}


export default Persons