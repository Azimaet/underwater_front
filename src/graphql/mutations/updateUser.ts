import gql from "graphql-tag";

export const MUTATION_UPDATE_USER = gql`
  mutation updateUser($input: updateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        avatar
      }
    }
  }
`;
