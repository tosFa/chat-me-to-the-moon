import React from 'react';
import Form from '../../forms/Signup'

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(values) {
    console.log(values);

  }

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <Form onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default Signup;