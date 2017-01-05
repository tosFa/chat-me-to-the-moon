import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextInput} from '../../elements/FormElements'
// import { EMAIL_REGEX } from '../../../../common/helpers/validation';

export const validate = values => {
	let errors = {};

	if (!values.contact_email || (values.contact_email && !values.contact_email.trim())) {
		errors.contact_email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contact_email)) {
		errors.contact_email = 'Invalid email address';
	}
	if (!values.name || (values.name && !values.name.trim())) {
		errors.name = 'Required'
	}

	return errors;
}

export const Form = props => {
	const { handleSubmit } = props;

	return (
		<form onSubmit={handleSubmit}>
			<Field name="name" type="text" component={TextInput} label="Name"/>
			<Field name="contact_email" type="contact_email" component={TextInput} label="Contact email"/>
			<button type="submit">Submit</button>
		</form>
	);

};

export default reduxForm({form: 'organization', validate})(Form);
