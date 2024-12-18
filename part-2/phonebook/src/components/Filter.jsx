import Persons from "./Persons";
const Filter = ({ handleSearch, search, filter, handleDelete }) => {
  return (
    <>
      filter shown with{" "}
      <input onChange={handleSearch} value={search} type="text" />
      <Persons persons={filter} handleDelete={handleDelete} />
    </>
  );
};
export default Filter;
