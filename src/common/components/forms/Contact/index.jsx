import React from 'react';
import { Field, reduxForm } from 'redux-form';


export const Contact = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="firstName">First name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <Field name="message" component="textarea"/>
      </div>
      <button type="submit">Submit</button>
    </form>
  );

};

export default reduxForm({form: 'contact'})(Contact);
