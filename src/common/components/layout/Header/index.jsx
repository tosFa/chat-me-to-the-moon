import React from 'react';
import CSSModules from 'react-css-modules';
import Navigation from '../../elements/Navigation';
import Logo from '../../elements/Logo';
import NavButton from '../../elements/NavButton';
import Container from '../../layout/Container';
import styles from './styles.css';
import { BrowserRouter } from 'react-router';

export const Header = (props, context) =>
  <header styleName="header">
    <Container>
      <Logo />
      <Navigation/>
      <NavButton url="/login" onClick={() => {}} label="Login"/>
    </Container>
  </header>

export default CSSModules(Header, styles);