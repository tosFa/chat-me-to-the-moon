import { defineTypesAsArray } from '../../helpers/duckTools';

export const testAsyncAction = () => ({
  types: defineTypesAsArray(['REQUEST', 'SUCCESS', 'FAIL'], 'TEST'),
  promise: ({ get }) => get('/test')
});

export const testAsyncAction2 = () => ({
  types: defineTypesAsArray(['REQUEST', 'SUCCESS', 'FAIL'], 'TEST2'),
  promise: ({ get }) => get('/test2')
});


export const upload = (files) => ({
  types: defineTypesAsArray(['REQUEST', 'SUCCESS', 'FAIL'], 'UPLOAD'),
  promise: ({ post }) => post('/upload', { attach: files })
});
