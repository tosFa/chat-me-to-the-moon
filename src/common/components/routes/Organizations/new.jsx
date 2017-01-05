import React from 'react';
import {graphql} from 'react-apollo';
import Form from '../../forms/Organizations';
import { ORGANIZATIONS_MUTATION_QUERY } from '../../../../client/graphql';

export class OrganizationNew extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = ::this.handleSubmit;
	}

	handleSubmit(values) {
		const { create, router: { transitionTo } } = this.props;

		create(values).then(({ data: { organizations, errors } }) => {
			if (!errors) {
				transitionTo(`/organizations/${organizations.data.id}`);
			}
			//@todo handle backend errors
		});
	}

	render() {
		return (
			<div>
				<h1>Create a new Organization</h1>
				<Form onSubmit={this.handleSubmit}/>
			</div>
		);
	}
}

const withMutation = graphql(ORGANIZATIONS_MUTATION_QUERY, {
	props: ({ ownProps, mutate }) => ({
		create: ({ name, contact_email }) => mutate({
			variables: { name, contact_email },
		})
	})
});


export default withMutation(OrganizationNew);