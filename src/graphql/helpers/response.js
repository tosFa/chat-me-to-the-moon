import { normalizeErrors } from '../helpers';

export default result => {
	console.log({result}, result.data, result.meta);
	return result.errors ? { errors: normalizeErrors(result) } : result
};