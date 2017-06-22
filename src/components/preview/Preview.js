import React from 'react';
import ValuePreview from './ValuePreview';
import ElementPreview from './ElementPreview';

export default class Preview extends React.Component {

  _renderPreview() {
    const { value } = this.props;
    if (!value || typeof value === 'undefined') {
      return null;
    }
    if (React.isValidElement(value)) {
      return <ElementPreview value={value} />
    }

    return <ValuePreview value={String(value)} />
  }

  render() {
    return (
      <div className="rp-preview">
        { this._renderPreview() }
      </div>
    )
  }
}