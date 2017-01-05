import React from 'react';
import { graphql } from 'react-apollo';
// import { Table } from '../../hoc/tables/components/Table'
import { ORGANIZATION_DATA_QUERY }
	from '../../../../client/graphql/organizations';


export class OrganizationView extends React.Component {
	render() {
		const { organization, loading } = this.props;
		console.log(this.props);
		if (loading) {
		 return (<div>Loading...</div>);
		}
		// const data = this.props.organizations && this.props.organizations.data ? this.props.organizations.data : [];
		// const loading = this.props.loading;
		return (
			<div>
				<h1>Organization</h1>
				<div>Name: {organization.data.name}</div>
			</div>
		);
	}
}

const withData = graphql(ORGANIZATION_DATA_QUERY, {
	options: ({ params: { id } }) => ({ variables: { id } }),
	props: ({ data: { loading, organization } }) => ({ loading, organization }),
});

export default withData(OrganizationView);