import React from 'react';
import CSSModules from 'react-css-modules';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import styles from './styles.css'

export const Layout = ({ children }) =>
  <div styleName="app">
    <Header/>
    <Content>{children}</Content>
    <Footer/>
  </div>

export default CSSModules(Layout, styles);