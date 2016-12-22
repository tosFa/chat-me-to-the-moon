import React from 'react';
import { graphql } from 'react-apollo';
import { Table } from '../../hoc/tables/components/Table'
import { ORGANIZATIONS_DATA_QUERY }
  from '../../../../client/graphql/organizations';


export class Organizations extends React.Component {
  render() {
    //if (!this.props.organizations.data) {
    //  return (<div>No Results....</div>);
    //}
    const data = this.props.organizations && this.props.organizations.data ? this.props.organizations.data : [];
    const loading = this.props.loading;
    const pagination = this.props.organizations ? this.props.organizations.meta.pagination : {};

    return (
      <div>
        <h1>Organizations</h1>
        <Table { ...{ data, pagination, loading } }/>
      </div>
    );
  }
}

const withData = graphql(ORGANIZATIONS_DATA_QUERY, {
  options: ({ location: { query } }) => {
    return {
      variables: {
        page: (query && query.page) ? query.page : 1,
        per_page: (query && query.per_page) ? query.per_page : 1,
        order : (query && query.order) ? query.order : 'created_at DESC'
      }
    }
  },
  props: ({ data: { loading, organizations } }) => ({
    loading, organizations
  }),
});

export default withData(Organizations);