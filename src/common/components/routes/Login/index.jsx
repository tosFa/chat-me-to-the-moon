import React from 'react';
import Form from '../../forms/Login'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(values) {
    console.log(values);
    alert('submit');
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
