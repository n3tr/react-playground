export default `// Hello

const Hello = ({ name }) => <h1>Hello, { name }</h1>

// Use run(...) for inline preview
run(<Hello />)

// -------

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

run(<Counter />)

`