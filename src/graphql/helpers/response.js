import { normalizeErrors } from '../helpers';

export default result => result.errors ? { errors: normalizeErrors(result) } : result.data;