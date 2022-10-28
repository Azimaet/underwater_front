import gql from "graphql-tag";

export const MUTATION_DELETE_USER = gql`
  mutation deleteUser($input: deleteUserInput!) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`;
