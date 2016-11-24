import React from 'react';
import 'normalize.css/normalize.css';
import '../../../styles/base.css';
import Routes from '../routes';
import Responsive from '../hoc/responsive';

export const App = (props) => <Routes {...props} />;

export default Responsive(App);
