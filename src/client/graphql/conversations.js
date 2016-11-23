import gql from 'graphql-tag';

export const CONVERSATION_SUBSCRIPTION_QUERY = gql`
  subscription onMessageAdded($conversationId: Int!){
    messageAdded(id: $conversationId){
      id
      authorId
      conversationId
      text
      files
    }
  }
`;

export const CONVERSATION_MUTATION_QUERY = gql `
mutation Message($id: Int!, $authorId: Int!, $conversationId: Int!, $text: String!, $files: [String]) {
  createMessage(id: $id, authorId: $authorId, conversationId: $conversationId, text: $text, files: $files){
    id
    text
  }
}`;

export const CONVERSATION_DATA_QUERY = gql`
  query Conversation($conversationId: Int!) {
    conversation(id: $conversationId) {
      messages {
        id
        text
        files
      }
    }
  }
`;