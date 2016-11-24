import React from 'react';
import executor from '../../../helpers/routes/executor'

export default class ActionExecutor extends React.Component {

  componentWillReceiveProps(nextProps) {

    if (nextProps.location != null && nextProps.location !== this.props.location) {
      executor(nextProps.location, nextProps.dispatch);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}