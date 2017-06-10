import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

export default class Editor extends React.Component {
    state = {
        code: 
`// Hello Component

class Hello extends React.Component {
    render() {
        return <h1>Hello</h1>
    }
}`,
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        })
    }
    
    render() {
        return (
            <div className="editor">
                <CodeMirror 
                value={this.state.code} 
                onChange={this.updateCode}
                options={{
                    mode: 'jsx',
                    lineNumbers: true,
                    theme: 'dracula'
                }} />
            </div>
        )
    }
}