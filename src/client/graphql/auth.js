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

export const SIGNIN_MUTATION_QUERY = gql `
mutation Signin($email: String!, $password: String!) {
  signin(email: $email, password: $password){
    auth_token
    errors {
      key
      errors
    }
  }
}`;

export const SIGNOUT_MUTATION_QUERY = gql `
mutation Signout{
  signout{
    success
    errors {
      key
      errors
    }
  }
}`;

export const CONFIRMATION_DATA_QUERY = gql `
query Confirmation($confirmation_token: String!) {
  confirmation(confirmation_token: $confirmation_token){
    auth_token
    errors {
      key
      errors
    }
  }
}`;