import Header from "./Header";
import Content from "./Content";
const Course = ({ name, parts }) => {
  console.log(name);
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
    </>
  );
};
export default Course;
