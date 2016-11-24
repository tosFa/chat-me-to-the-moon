import React from 'react';
import 'normalize.css/normalize.css';
import '../../../styles/base.css';
import Routes from '../routes';
import Layout from '../layout/Layout';
import Responsive from '../hoc/responsive';


@Responsive
export default class App extends React.Component {
  render() {
    return (<Layout {...this.props}><Routes {...this.props}/></Layout>);
  }
}

