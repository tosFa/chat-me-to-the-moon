import React from 'react';
import { graphql } from 'react-apollo';
import { CONFIRMATION_DATA_QUERY } from '../../../../client/graphql';

export class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Loading....',
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading, confirmation } = nextProps;
    const successTitle = 'You have successfully confirmed your account';
    const failTitle = 'Your account couldn\'t be confirmed';

    if (loading === false) {
      if (confirmation.errors) {
        this.setState({title: failTitle, errors: confirmation.errors});
      } else {
        this.setState({title: successTitle});
      }
    }
  }

  render() {
    const { title, errors } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {
            errors.map(
              errorObj => errorObj.errors.map((error, index) => <li key={`${errorObj.key}-${index}`}>{error}</li>)
            )
          }
        </ul>
      </div>
    );
  }
}

const withData = graphql(CONFIRMATION_DATA_QUERY, {
  options: ({ params: { token }}) => ({
    variables: { confirmation_token: token }
  }),
  props: ({ data: { loading, confirmation }, ownProps }) => ({
    loading, confirmation, ownProps
  })
});

export default withData(Confirmation)