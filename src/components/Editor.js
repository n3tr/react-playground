import React from 'react';
import ReactDOM from "react-dom";
import * as Babel from "babel-standalone";
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import { createIframe, addPreviewDiv } from 'utils/frame';
import { appendLineNumber } from 'utils/babel-apply-line-number';
Babel.registerPlugin('appendLineNumber', appendLineNumber);

const log = console.log;

export default class Editor extends React.Component {
    currentWidgets = []
    state = {
        error: null,
        code:
        `// Hello

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

`,
    }

    updateCode = (newCode) => {
        this.setState({
            code: newCode
        })
    }

    _run(element, line) {
        const codeMirror = this.codemirror.getCodeMirror()
        const codeMirrorDocument = codeMirror.doc

        const previewIframe = createIframe(() => {
            const previewDiv = addPreviewDiv(previewIframe);
            try {
                previewIframe.height = 0
                ReactDOM.render(element, previewDiv, () => {
                    previewIframe.width = previewIframe.contentWindow.document.body.scrollWidth;
                    previewIframe.height = previewIframe.contentWindow.document.body.scrollHeight + 10;
                }); 
            } catch (error) {
                // TODO: Display better error for each preview
                ReactDOM.render(<div>{ error.message }</div>, previewDiv, () => {
                    previewIframe.width = previewIframe.contentWindow.document.body.scrollWidth;
                    previewIframe.height = previewIframe.contentWindow.document.body.scrollHeight + 10;
                })
            }
            
        })

        const widget = codeMirrorDocument.addLineWidget(line - 1, previewIframe, { coverGutter: false })
        this.currentWidgets.push(widget)
    }

    _clearAllWidgets() {
        const codeMirror = this.codemirror.getCodeMirror()
        const codeMirrorDocument = codeMirror.doc

        this.currentWidgets.forEach(widget => {
            codeMirrorDocument.removeLineWidget(widget)
        })

        this.currentWidgets = []
    }

    _executeCode = () => {
        this._clearAllWidgets()
        const { code } = this.state;
        try {
            const compiledCode = this._compileCode(code);
            eval(compiledCode).apply(null, [this._run.bind(this), React])
            this.setState({
                error: null
            })
        } catch (error) {
            // TODO: Need to format error
            this.setState({
                error: error
            })
        }

    }

    _compileCode(code) {
        const compiled = Babel.transform(
            code,
            {
                presets: ['es2015', 'stage-1', 'react'],
                plugins: ['appendLineNumber']
            }
        ).code
        return `((run, React) => { ${compiled} });`
    }

    render() {
        return (
            <div className="editor">
                <div className="console-pane">
                    <button onClick={this._executeCode}>Run</button>
                </div>
                <div className="editor-pane">
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
                <div className="error-pane">
                    <span dangerouslySetInnerHTML={
                        { __html: this.state.error ? this.state.error : null }
                    } />
                </div>
            </div>
        )
    }
}