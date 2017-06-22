import React from 'react';
import styled from 'styled-components';

const ValueText = styled.span`
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 300;
`

export default class ValuePreview extends React.Component {
  render() {
    return (
      <div className="rp-preview rp-value-preview">
        <ValueText>{ this.props.value }</ValueText>
      </div>
    )
  }
}