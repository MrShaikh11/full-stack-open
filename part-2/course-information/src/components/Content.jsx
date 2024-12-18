import Part from "./Part";
const Content = ({ parts }) => {
  // console.log(parts[0].name);
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} key={part.id} />;
      })}
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </>
  );
};

export default Content;
