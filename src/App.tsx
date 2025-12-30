import { useState } from 'react'; // You can remove this if not used
import './App.css';

type TestComponentOneProps = {
  fName: string;
  lName: string;
  age: number;
  height: number;
};

function TestComponentOne(props: TestComponentOneProps) {
  console.log('Hello From Test Component 1', props);

  return (
    <div className="test-component-one">
      <h2>Test Component One</h2>
      <p>
        Name: {props.fName} {props.lName}
      </p>
      <p>Age: {props.age}</p>
      <p>height: {props.height}</p>
    </div>
  );
}

function App() {
  const [val, setValu] = useState(0)
  const [val2, setVal2] = useState(1);
  return (
    <div className="main_return">
      <button onClick={() => {
        setValu((prev) => prev + 1)
        setVal2((prev) => prev + 2);
      }}>Checking Re-render</button>
      <TestComponentOne fName="Ajay" lName="Kushwaha" age={val} height={val2} />
    </div>
  );
}

export default App;