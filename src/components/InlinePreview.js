import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createIframe, addPreviewDiv } from 'utils/dom';


export default class InlinePreview extends React.Component {
  componentDidMount() {
    if (!this.context.codemirror) {
      return;
    }
    this._renderPreview(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.props.value) {
      return
    }

    if (nextProps.__runRef !== this.props.__runRef) {
      this._clearWidget();
    }

    if (!this.mountNode || !this.previewIframe) {
      this._renderPreview(nextProps);
      return
    }

    this._renderIntoMountDom(nextProps.value);
  }

  _clearWidget() {
    this.mountNode = null;
    this.previewIframe = null;
    if (this.lineWidget) {
      this.lineWidget.clear();
    }
  }

  _renderPreview(props) {
    const codeMirror = this.context.codemirror;
    const codeMirrorDocument = codeMirror.doc;

    this.previewIframe = createIframe(() => {
      this.mountNode = addPreviewDiv(this.previewIframe);
      this._renderIntoMountDom(props.value);
    })

    this.lineWidget = codeMirrorDocument.addLineWidget(
      props.lineNumber - 1, this.previewIframe, { coverGutter: false }
    )
    this.lineWidget.changed();
  }

  _renderIntoMountDom(value) {
    try {
        this.previewIframe.height = 0;
        ReactDOM.render(value, this.mountNode, () => {
          this.previewIframe.height = this.previewIframe.contentWindow.document.body.scrollHeight + 24;
        });
      } catch (error) {
        console.error(error)
        // TODO: Display better error for each preview
        ReactDOM.render(<div>{error.message}</div>, this.mountNode, () => {
          this.previewIframe.height = this.previewIframe.contentWindow.document.body.scrollHeight + 24;
        })
      }
  }

  componentWillUnmount() {
    this._clearWidget();
  }

  render() {
    return null;
  }
}

InlinePreview.PropTypes = {
  lineNumber: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired
}

InlinePreview.contextTypes = {
  codemirror: PropTypes.object
};
