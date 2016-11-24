import React from 'react';
import Form from '../../forms/Contact'

export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  componentWillMount() {

  }

  handleSubmit(values) {
    console.log(values);
    alert('submit');
  }

  render() {
    return (
      <div>
        <h1>Contact</h1>
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
