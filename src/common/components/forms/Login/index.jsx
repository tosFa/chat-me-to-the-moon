import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '../../elements/FormElements'
// import { EMAIL_REGEX } from '../../../../common/helpers/validation';

export const validate = values => {
  let errors = {};

  if (!values.email || (values.email && !values.email.trim())) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password || (values.password && !values.password.trim())) {
    errors.password = 'Required';
  }

  return errors;
}

export const Login = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={TextInput} label="Email"/>
      <Field name="password" type="password" component={TextInput} label="Password"/>
      <button type="submit">Log in</button>
    </form>
  );

};

export default reduxForm({ form: 'login', validate })(Login);
