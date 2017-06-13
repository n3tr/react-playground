export default `// -----
// Hello
// -----

const Hello = ({ name }) => <h1>Hello, { name }</h1>

// Use run(...) for inline preview
run(<Hello name="Net"/>)

// ------
// Button
// ------
const Button = ({ color = "red" }) => { 
  const style = {
  	backgroundColor: color,
    padding: 12,
    color: '#fff',
    border: 'none',
    borderRadius: 3,
    fontSize: 16
  }
  return <button style={style}>Button</button>
}


run(<Button />)
run(<Button color="blue"/>)


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