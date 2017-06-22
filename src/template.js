export default `// Babel-standalone: es2015, stage-1, react
// Global Scope support: React, styled

const name = "David";
name;



const Hello = ({ name }) => {
  return <p>Hello, { name }</p>
};

<Hello name={name} />



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

<Button>Click Me</Button>;



// Counter

class Counter extends React.Component {
  state = { count: 0 }
  increase = () => {
	this.setState({ count: this.state.count + 1 })
  }
  decrease = () => {
    this.setState({ count: this.state.count - 1 })
  }
  render() {
    return (
      <div>
        <div><h1>{ this.state.count }</h1></div>
        <button onClick={this.decrease}>-</button>
        <button onClick={this.increase}>+</button>
      </div>
    )
  }
}

<Counter />;


`