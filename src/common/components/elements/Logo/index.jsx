import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import image from '../../../../styles/assets/Logo_Image_01.png';

export const Logo = () =>
  <div styleName="logo-wrapper">
    <Link styleName="logo-link" to="/">
      <img src={image} styleName="img"/>
    </Link>
  </div>

export default CSSModules(Logo, styles);