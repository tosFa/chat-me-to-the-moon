import React from 'react';
import CSSModules from 'react-css-modules';
import Container from '../../layout/Container';
import styles from './styles.css';
import AsyncActions from '../../hoc/async-actions';
import { testAsyncAction, testAsyncAction2 } from '../../../redux/actions';

export const Home = () =>
  <div styleName="wrapper">
    <div styleName="item">
      <img src="http://lorempixel.com/g/400/200/" />
      Home1
    </div>
    <div styleName="item">Home2</div>
    <div styleName="item">Home3</div>
    <div styleName="item">Home4</div>
  </div>

export default AsyncActions(CSSModules(Home, styles), [testAsyncAction, testAsyncAction2]);