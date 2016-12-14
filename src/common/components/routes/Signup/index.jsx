import React from 'react';
import Form from '../../forms/Signup';
import { SIGNUP_MUTATION_QUERY } from '../../../../client/graphql';
import { graphql } from 'react-apollo';


export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(values) {
    const { signup } = this.props;

    signup(values).then((...args) => {
      console.log({args, props: this.props});
      alert('Signup success');
    })

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

const withMutation = graphql(SIGNUP_MUTATION_QUERY, {
  props: ({ ownProps, mutate }) => ({
    signup: ({ email, password, password_confirmation }) => mutate({
      variables: { email, password, password_confirmation },
    })
  })
});


export default withMutation(Signup);