import gql from "graphql-tag";

export const MUTATION_CREATE_USER = gql`
  mutation createUser($input: createUserInput!) {
    createUser(input: $input) {
      dive
    }
  }
`;
