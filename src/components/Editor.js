import React from 'react';
import ReactDOM from "react-dom";
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

import { createIframe, addPreviewDiv } from 'utils/dom';
import { compileAndExecute } from 'utils/compiler';

import template from 'template';



export default class Editor extends React.Component {
  currentWidgets = []
  state = {
    error: null,
    code: template
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
        ReactDOM.render(element, previewDiv, () => {
          previewIframe.height = previewIframe.contentWindow.document.body.scrollHeight + 10;
        });
      } catch (error) {
        console.error(error)
        // TODO: Display better error for each preview
        ReactDOM.render(<div>{error.message}</div>, previewDiv, () => {
          previewIframe.height = previewIframe.contentWindow.document.body.scrollHeight + 10;
        })
      }
    })

    const widget = codeMirrorDocument.addLineWidget(line - 1, previewIframe, { coverGutter: false })
    this.currentWidgets.push(widget)
  }

  _clearAllWidgets = () => {
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
    const scope = { React: React }
    
    try {
      compileAndExecute(code, scope, this._run.bind(this));
      this.setState({
        error: null
      })
    } catch (error) {
      // TODO: Need to format error
      console.error(error)
      this.setState({ error })
    }
  }
  

  render() {
    return (
      <div className="editor">
        <div id="header" className="console-pane">
          <div id="header-inner">
            <h1 id="logo">React Playground</h1>
            <div className="console">
              <button className="button" onClick={this._executeCode}>Run</button>
            </div>
            <div className="social-bar">
              <a href="https://github.com/n3tr/react-playground">Github</a>
            </div>
          </div>
          
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