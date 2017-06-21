export default `// -----
// Hello
// -----

const Hello = ({ name }) => <h1>Hello, { name }</h1>

// Use run(...) for inline preview
run(<Hello name="Playground"/>)



// ------
// Styled-Component
// ------
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
\`

run(<Button>Click Me</Button>)



// -------
// Counter
// -------

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

run(<Counter />)

`