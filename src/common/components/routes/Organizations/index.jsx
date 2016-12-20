import React from 'react';
import { graphql } from 'react-apollo';
import { ORGANIZATIONS_DATA_QUERY }
  from '../../../../client/graphql/organizations';

export class Organizations extends React.Component {
  render() {
    console.log(this.props);
    return (<h1>Organizations</h1>);
  }
}

const withData = graphql(ORGANIZATIONS_DATA_QUERY, {
  options: ({ location: { query } }) => {
    return {
      variables: {
        page: query.page || 1,
        per_page: query.per_page || 1,
        order : query.order || 'created_at DESC'
      }
    }
  },
  props: ({ data: { loading, organizations } }) => ({
    loading, organizations
  }),
});

export default withData(Organizations);