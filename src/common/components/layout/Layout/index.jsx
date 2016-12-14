import React from 'react';
import CSSModules from 'react-css-modules';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../Content';
import styles from './styles.css'
import { omit } from '../../../helpers/duckTools';

export const Layout = (props) => {
  const passingProps = omit(props, ['children', 'styles']);

  return (
    <div styleName="app">
      <Header {...passingProps} />
      <Content>{props.children}</Content>
      <Footer {...passingProps} />
    </div>
  );
}

export default CSSModules(Layout, styles);
