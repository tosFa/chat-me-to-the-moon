import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import Form from '../../forms/Login'
import { SIGNIN_MUTATION_QUERY } from '../../../../client/graphql';
import createCookies from '../../../helpers/cookies';

const cookies = createCookies();

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = ::this.handleSubmit;
  }

  handleSubmit(values) {
    const { signin, router: { transitionTo } } = this.props;

    signin(values).then(({data: { signin, errors } }) => {
      if (!errors) {
        //login user
        cookies.set('chat-api-access_token', signin.auth_token, 1);
        transitionTo(`/conversations/1`);
      } else {
        //@todo handle backend errors
      }

    })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}/>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}

const withMutation = graphql(SIGNIN_MUTATION_QUERY, {
  props: ({ ownProps, mutate }) => ({
    signin: ({ email, password }) => mutate({
      variables: { email, password },
    })
  })
});

export default withMutation(Login)