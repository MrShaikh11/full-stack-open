import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No Feedback Given</div>;
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + bad + neutral} />
          <StatisticLine
            text="average"
            value={(good - bad) / (good + bad + neutral)}
          />
          <StatisticLine
            text="postive"
            value={`${(good / (good + bad + neutral)) * 100} %`}
          />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ title, handleOnClick }) => {
  return (
    <>
      <button onClick={handleOnClick}>{title}</button>
    </>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      {/* <button onClick={() => setGood(good + 1)}>good</button> */}
      <Button title="good" handleOnClick={() => setGood(good + 1)} />
      <Button title="neutral" handleOnClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" handleOnClick={() => setBad(bad + 1)} />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
