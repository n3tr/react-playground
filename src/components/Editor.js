import React from 'react';
import ReactDOMServer from "react-dom/server";
import * as Babel from "babel-standalone";
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

function appendLineNumber() {
    return {
        visitor: {
            CallExpression(path) {
                if(path.node.callee.name === 'run') {
                    console.log(path)
                    const { end } = path.node.loc;
                    path.node.arguments = path.node.arguments.concat([{ type: 'NumericLiteral', value: end.line}])
                }
            }
        }
    }
}

Babel.registerPlugin('appendLineNumber', appendLineNumber);

const log = console.log;

export default class Editor extends React.Component {
    currentWidgets = []
    state = {
        code: 
`// Hello Component

class Hello extends React.Component {
    render() {
        return <h1>Hello</h1>
    }
}

run(<Hello />)
`,
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        })
    }

    _run(element, line) {
        
        const previewDom = this._createPreviewElement(element)
        const codeMirror = this.codemirror.getCodeMirror()
        const codeMirrorDocument = codeMirror.doc


        const addedWidget = codeMirrorDocument.addLineWidget(line - 1 , previewDom)
        this.currentWidgets.push(addedWidget)
        
        
        // doc.addlineWidget(line, )
    }

    _clearAllWidgets() {
        const codeMirror = this.codemirror.getCodeMirror()
        const codeMirrorDocument = codeMirror.doc

        this.currentWidgets.forEach( widget => {
            codeMirrorDocument.removeLineWidget(widget)
        })

        this.currentWidgets = []
    }

    _createPreviewElement(reactElement) {
        const htmlText = ReactDOMServer.renderToStaticMarkup(reactElement)
        const div = document.createElement('div');
        div.innerHTML = htmlText
        return div
    }

    _executeCode = () => {
        this._clearAllWidgets()
        const { code } = this.state;
        const compiledCode = this._compileCode(code);
        eval(compiledCode).apply(null, [this._run.bind(this), React])
        
    }

    _compileCode(code) {
        const compiled =  Babel.transform(
            code, 
            { presets: ['es2015', 'react'], plugins: ['appendLineNumber'] }).code
        return `((run, React) => { ${compiled} });`
    }
    
    render() {
        return (
            <div className="editor">
                <div className="editor-console">
                    <button onClick={this._executeCode}>Run</button>
                </div>
                <CodeMirror 
                ref={(codemirror) => { this.codemirror = codemirror; }}
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