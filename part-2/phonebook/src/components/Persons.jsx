import Person from "./Person";
const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => {
        return (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default Persons;
