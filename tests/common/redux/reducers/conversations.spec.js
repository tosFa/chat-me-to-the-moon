import reducer, { initialState, postUploadAsyncTypes }
  from '../../../../src/common/redux/reducers/conversations';
import { expect } from 'chai';

describe("Conversation reducer", function() {

  it("REQUEST BEHAVIOUR", function() {
    const expectedState = {...initialState, loading: true, filenames: [], error: null};
    const resultState = reducer(initialState, {type: postUploadAsyncTypes.REQUEST});

    expect(resultState).to.deep.equal(expectedState);
  });

});