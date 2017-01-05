import gql from 'graphql-tag';

export const ORGANIZATIONS_DATA_QUERY = gql`
  query Organizations($page: Int, $per_page: Int, $order: String) {
    organizations(page: $page, per_page: $per_page, order: $order) {
      data{
      id
      contact_email
      user {
        id
        email
      }
    }
    errors{
      key
      errors
    }
    meta{
      pagination{
       	current_page
      	total_pages
        prev_page
        next_page
        total_count
      }
    }
    }
  }
`;

export const ORGANIZATION_DATA_QUERY = gql`
  query Organization($id: Int!) {
    organization(id: $id) {
      data {
      	id
      	name
      	contact_email
				user {
					id
					email
				}
			}
			errors{
				key
				errors
			}
    }
  }
`;



export const ORGANIZATIONS_MUTATION_QUERY = gql`
  mutation Organization($id: Int, $name: String!, $contact_email: String!) {
    organization(id: $id, name: $name, contact_email: $contact_email) {
    	data {
    		id
    	}
    	errors {
    		key
    		errors
    	}
    }
  }
`;