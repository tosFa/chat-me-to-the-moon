import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '../../elements/FormElements'
// import { EMAIL_REGEX } from '../../../../common/helpers/validation';

export const validate = values => {
  let errors = {};

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required';
  }
  if (values.password_confirmation !== values.password) {
    errors.password = 'Passwords do not match';
    errors.password_confirmation = 'Passwords do not match';
  }
  return errors
}

export const Signup = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={TextInput} label="Email"/>
      <Field name="password" type="password" component={TextInput} label="Password"/>
      <Field name="password_confirmation" type="password" component={TextInput} label="Password Confirmation"/>
      <button type="submit">Sign up</button>
    </form>
  );

};

export default reduxForm({ form: 'signup', validate })(Signup);
