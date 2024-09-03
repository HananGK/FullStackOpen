const Person = ({ id, name, number, handleDelete }) => {
    return(
        <div>
            <p key={id}>{name} {number}</p>
            <button onClick={() => handleDelete(id)} >delete</button>
        </div>
    )
}
const Persons = ({ numbersToShow, handleDelete }) => <div>{numbersToShow.map((person) => <Person key={person.id} id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>)}</div>
export default Persons