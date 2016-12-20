import gql from 'graphql-tag';

export const ORGANIZATIONS_DATA_QUERY = gql`
  query Organizations($page: Int, $per_page: Int, $order: String) {
    organizations(page: $page, per_page: $per_page, order: $order) {
      id
      name
      contact_email
      user {
        email
      }
    }
  }
`;