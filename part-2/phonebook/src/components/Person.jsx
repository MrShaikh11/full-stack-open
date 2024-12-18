const Person = ({ name, number, handleDelete, id }) => {
  return (
    <>
      <div>
        {name} {number} <button onClick={() => handleDelete(id)}>delete</button>
      </div>
    </>
  );
};

export default Person;
