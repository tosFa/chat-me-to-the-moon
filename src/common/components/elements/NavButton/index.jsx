import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import { Link } from 'react-router';

export const Button = ({ onClick, label, url }) =>
  <div styleName="wrapper"><Link to={url} styleName="btn">{label}</Link></div>

Button.defaultProps = {
  label: 'Button',
  url: '/'
}

export default CSSModules(Button, styles);
