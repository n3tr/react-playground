import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { 
  createInlinePreviewContainer, 
  createInlinePreviewMountDom 
} from 'utils/dom';

import Preview from './preview/Preview';


export default class InlinePreview extends React.Component {
  componentDidMount() {
    if (!this.context.codemirror) {
      return;
    }
    this._renderPreview();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === this.props.value) {
      return
    }

    if (nextProps.__runRef !== this.props.__runRef) {
      this._clearWidget();
    }

    if (!this.mountNode) {
      this._renderPreview();
      return;
    }

    this._renderIntoMountDom(nextProps);
  }

  _clearWidget() {
    this.mountNode = null;
    if (this.lineWidget) {
      this.lineWidget.clear();
    }
  }

  _renderPreview() {
    const codeMirror = this.context.codemirror;
    const codeMirrorDocument = codeMirror.doc;

    const container = createInlinePreviewContainer()    
    this.mountNode = createInlinePreviewMountDom()
    container.appendChild(this.mountNode);
    
    this._renderIntoMountDom(this.props);

    this.lineWidget = codeMirrorDocument.addLineWidget(
      this.props.lineNumber - 1, container, { coverGutter: true }
    )
  }

  _renderIntoMountDom(props) {
    try {
        ReactDOM.render(<Preview value={props.value} />, this.mountNode);
      } catch (error) {
        console.error(error)
        // TODO: Display better error for each preview
        ReactDOM.render(<Preview value={error} />, this.mountNode)
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
