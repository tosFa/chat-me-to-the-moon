import React from 'react';
import { omit } from '../../../helpers/duckTools';

export default (props) =>
  <main>
    {React.Children.map(props.children, child => React.cloneElement(child, omit(props, ['children'])))}
  </main>