import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  background-color: #333340;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 300;
  color: #fff;
  text-shadow: 0 1px #000;
  margin: 0;
  padding: 0;
  margin-left: 24px;
  margin-right: 24px;
`

const ActionButton = styled.button`
  font-size: 16px;
  color: #fff;
  background-color: rgba(0,0,0, 0.3);
  height: 36px;
  min-width: 80px;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.1s ease;
  

  &:hover {
    background-color: rgba(0,0,0, 0.4);
  }
`

const ActionToolBar = styled.div`
  flex: 1;
  display: flex;
`

const SocialBar = styled.div`
  display: flex;
  margin-right: 24px;
`

const SocialLink = styled.a`
  color: #fff;
  font-weight: 300;
  text-decoration: none;
  transition: color 0.1s ease;

  &:hover {
    color: #eee;
  }
`

const Header = ({ onClickRun }) => {
  return (
    <HeaderWrapper>
        <Logo>React Playground</Logo>
        <ActionToolBar>
          <ActionButton onClick={onClickRun}>Run</ActionButton>
        </ActionToolBar>
        <SocialBar>
          <SocialLink href="https://github.com/n3tr/react-playground">Github</SocialLink>
        </SocialBar>
    </HeaderWrapper>
  )
}

export default Header