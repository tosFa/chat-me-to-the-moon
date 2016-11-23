import React from 'react';
import _ from 'lodash';

const breakpoints = {
  'xs': 320,
  'sm': 768,
  'md': 992,
  'lg': 1200
};

const functionConstructor = (InnerComponent, showFor = ['xs', 'sm', 'md', 'lg']) => {

  return class extends React.Component{
    constructor(props) {
      super(props);
      this.state = {};
      this.setSize = ::this.setSize;
    }
    componentDidMount() {
      this.setSize();
      window.onresize = () => this.setSize();
    }

    setSize() {
      const size = Object.keys(breakpoints).reduce((accum, curr) => {
        return (breakpoints[curr] < window.innerWidth) ? curr : accum;
      }, 'xs');

      this.setState({size});
    }

    render() {
      const { size } = this.state;

      return (showFor.find(item => item === size)) ?
        (<InnerComponent {...this.props} {...this.state} />) : null;
    }
  }
}

const decoratorConstructor = (showFor) => (Component) => functionConstructor(Component, showFor);

export default (...args) => {
  if (_.isFunction(args[0])) {
    return functionConstructor(args[0], args[1]);
  } else {
    return decoratorConstructor(args[0]);
  }
};
