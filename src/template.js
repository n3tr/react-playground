export default `// Babel-standalone: es2015, stage-1, react
// Global Scope support: React, styled

const name = "David";
render(name);



const Hello = ({ name }) => {
  return <p>Hello, { name }</p>
};

render(<Hello name={name} />);



// Styled-Component

const Button = styled.button\`
  font-size: 16px;
  color: #fff;
  background-color: #902934;
  height: 36px;
  min-width: 80px;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.1s ease;
  

  &:hover {
    background-color: #802934;
  }
\`;

render(<Button>Click Me</Button>);



// Counter

const Counter = () => {
  const [count, setCount] = React.useState(0)
  const increase = () => {
    setCount(count + 1)
  }
  const decrease = () => {
    setCount(count - 1)
  }
  return (
    <div>
      <div><h1>{ count }</h1></div>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
    </div>
  )
}

render(<Counter />);


`;
