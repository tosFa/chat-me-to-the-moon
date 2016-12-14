import React from 'react';
import executor from '../../../helpers/routes/executor';
import { omit } from '../../../helpers/duckTools';

export default class ActionExecutor extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.location != null && nextProps.location !== this.props.location) {
      executor(nextProps.location, nextProps.dispatch, nextProps.routes);
    }
  }

  render() {
    return React.cloneElement(this.props.children, omit(this.props, ['children']));
  }
}