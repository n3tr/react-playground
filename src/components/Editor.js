import React from 'react';
import ReactDOM from "react-dom";
import * as Babel from "babel-standalone";
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import { createIframe, addPreviewDiv } from 'utils/frame';

function appendLineNumber() {
    return {
        visitor: {
            CallExpression(path) {
                if (path.node.callee.name === 'run') {
                    const { end } = path.node.loc;
                    path.node.arguments.push({ type: 'NumericLiteral', value: end.line })
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
        error: null,
        code:
        `// Hello Component

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    ) 
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
        const codeMirror = this.codemirror.getCodeMirror()
        const codeMirrorDocument = codeMirror.doc

        const previewIframe = createIframe(() => {
            const previewDiv = addPreviewDiv(previewIframe);
            ReactDOM.render(element, previewDiv, () => {
                previewIframe.width = previewIframe.contentWindow.document.body.scrollWidth;
                previewIframe.height = previewIframe.contentWindow.document.body.scrollHeight;
            });
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