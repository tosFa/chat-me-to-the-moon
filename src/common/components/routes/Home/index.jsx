import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.css';
import { actions as tableActions } from '../../hoc/tables/redux';
import { Table } from '../../hoc/tables/components/Table';


const node = {id: 'id', from: 'from', to: 'to', message: 'message', time: 'time'};
const nodes = ['id', 'from', 'to', 'message', 'time'];
const actions = ['view', 'edit', 'delete'];
const data = [node, node, node];

export const Home = (props) => {
  console.log(props);
  return (<div styleName="wrapper">

    <div styleName="item">Home2</div>
    <div styleName="item">Home3</div>
    <div styleName="item">Home4</div>
  </div>);
}

export default CSSModules(Home, styles);
