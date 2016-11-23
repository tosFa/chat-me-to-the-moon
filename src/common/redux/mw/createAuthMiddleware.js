import { saveCredentials } from 'store/actions/auth';

export default (doRedirection) => ({ dispatch }) => (next) => (action) => {
  const { result } = action;

  if (result) {
    const { credentials, redirect } = result;

    if (credentials) {
      dispatch(saveCredentials(credentials));
    } else if (redirect) {
      doRedirection(redirect);
    }
  }

  return next(action);
};