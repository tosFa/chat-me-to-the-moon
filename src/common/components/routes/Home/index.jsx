import React from 'react';
import CSSModules from 'react-css-modules';
import Container from '../../layout/Container';
import styles from './styles.css';

export const Home = () =>
  <div styleName="wrapper">
    <div styleName="item">

      Home1
    </div>
    <div styleName="item">Home2</div>
    <div styleName="item">Home3</div>
    <div styleName="item">Home4</div>
  </div>

export default CSSModules(Home, styles);
