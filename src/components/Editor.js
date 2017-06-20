import React from 'react';
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars.js';

import template from 'template';
import { compileAndExecute } from 'utils/compiler';
import Header from 'components/Header';
import InlinePreview from 'components/InlinePreview';


export default class Editor extends React.Component {
  currentWidgets = []
  state = {
    error: null,
    code: template,
    previewElements: []
  }

  getChildContext() {
    return { codemirror: this.codemirror ? this.codemirror.getCodeMirror() : null};
  }

  updateCode = (newCode) => {
    this.setState({
      code: newCode
    })
  }

  _executeCode = () => {
    const codeMirror = this.codemirror.getCodeMirror()
    const codeMirrorDocument = codeMirror.doc
    const previewElements = [];
    let runCount = 0
    function run(element, line) {
      const lineInfo = codeMirrorDocument.lineInfo(line - 1);
      previewElements.push({
        lineNumber: line,
        value: element,
        __text: lineInfo.text,
        __runRef: runCount
      });
      runCount++;
    }

    const { code } = this.state;
    const scope = { React: React }
    try {
      compileAndExecute(code, scope, run.bind(this));
      this.lastScrollPosition = codeMirror.getScrollInfo();
      this.setState(() => {
        return {
          error: null,
          previewElements: previewElements
        }
      })
    } catch (error) {
      // TODO: Need to format error
      console.error(error)
      this.setState({ error, previewElements: [] })
    }
  }

  componentDidMount() {
    
    // this.codemirror.getCodeMirror().refresh();
  }

  componentDidUpdate() {
    // FIXME:
    // This is Hack to recover scroll position for after render preview
    if (this.lastScrollPosition) {
      this.codemirror.getCodeMirror().scrollTo(this.lastScrollPosition.left, this.lastScrollPosition.top)
      this.lastScrollPosition = null;
    }
  }

  render() {
    return (
      <div className="playground-container">
        <div className="playground-container-inner">
          <header>
            <Header onClickRun={this._executeCode} />
          </header>
        
        <div className="playground-editor">
            <CodeMirror
              ref={(codemirror) => { this.codemirror = codemirror; }}
              onChange={this.updateCode}
              value={this.state.code}
              options={{
                mode: 'jsx',
                lineNumbers: true,
                theme: 'dracula',
                autoCloseBrackets: true,
                scrollbarStyle: "simple",
                viewportMargin: Infinity
                
              }} />
        </div>
        
        <div className="error-pane">
          <span dangerouslySetInnerHTML={
            { __html: this.state.error ? this.state.error : null }
          } />
        </div>
        {
          this.state.previewElements.map( (previewElement) => {
            return (
              <InlinePreview 
              key={previewElement.lineNumber}
              lineNumber={previewElement.lineNumber} 
              value={previewElement.value}
              __text={previewElement.__text}
              __runRef={previewElement.__runRef} />
            )
          })
        }
        </div>
      </div>
    )
  }
}

Editor.childContextTypes = {
  codemirror: PropTypes.object
};

