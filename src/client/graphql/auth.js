import gql from 'graphql-tag';

export const SIGNUP_MUTATION_QUERY = gql `
mutation Signup($email: String!, $password: String!, $password_confirmation: String!) {
  signup(email: $email, password: $password, password_confirmation: $password_confirmation){
    confirmation_token
    errors {
      key
      errors
    }
  }
}`;