import React from 'react';
import CSSmodules from 'react-css-modules';
import styles from './styles.css';

export const Container = ({ children }) =>
  <div styleName="container">{React.Children.map(children, child => child)}</div>

export default CSSmodules(Container, styles);