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