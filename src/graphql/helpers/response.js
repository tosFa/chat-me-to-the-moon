import { normalizeErrors } from '../helpers';

export default result => {
	console.log({result}, normalizeErrors(result));
	return result.errors ? { errors: normalizeErrors(result) } : result
};