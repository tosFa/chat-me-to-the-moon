import React from 'react';
import { graphql } from 'react-apollo';
import Form from '../../forms/Signup';
import { SIGNUP_MUTATION_QUERY } from '../../../../client/graphql';

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(values) {
    const { signup, router: { transitionTo } } = this.props;

    signup(values).then(({data: { signup, errors } }) => {
      if (!errors) {
        transitionTo(`/confirmation/${signup.confirmation_token}`);
      }
      //@todo handle backend errors
    });
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