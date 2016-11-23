import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const functionConstructor = (InnerComponent, actions = []) => {

  class Return extends React.Component{
    constructor(props) {
      super(props);

    }
    componentWillMount() {
      const boundActions = bindActionCreators(actions, this.props.dispatch);
      Promise.all(
        Object.keys(boundActions).map(item => {
          console.log(boundActions[item]);
          boundActions[item]();
        })
      ).then(() => {console.log('all promises resolved: ', process.env.IS_NODE)});
    }
    componentDidMount() {

    }

    render() {

      return (<InnerComponent {...this.props} {...this.state} />);
    }
  }
  return connect()(Return);
}

const decoratorConstructor = (actions) => (Component) => functionConstructor(Component, actions);

export default (...args) => {
  if (_.isFunction(args[0])) {
    return functionConstructor(args[0], args[1]);
  } else {
    return decoratorConstructor(args[0]);
  }
};