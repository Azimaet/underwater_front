import { ApolloQueryResult } from "@apollo/client";
import { DocumentNode } from "graphql";
import { DocumentParameter } from "@vue/apollo-composable/dist/useQuery";
import { GraphqlActions } from "@/composables/types/graphql";
import { QUERY_DIVING_ENVIRONMENTS } from "@/graphql/queries/queryDivingEnvironment";
import { QUERY_DIVING_ROLES } from "@/graphql/queries/queryDivingRole";
import { QUERY_DIVING_TYPES } from "@/graphql/queries/queryDivingType";
import { QUERY_GASTANKS_BY_DIVES } from "@/graphql/queries/queryDives";
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";

/**
 * GraphQL Requests Factory
 * @param {GraphqlActions} action GraphqlActions
 * @param {object} variables object
 */
export function useGqlQueryManager(action: GraphqlActions, variables?: object) {
  /**
   * Process Query function helper
   * @param {DocumentNode} gqlAction {DocumentNode}
   */
  function processQuery(gqlAction: DocumentNode) {
    const { result } = useQuery(gqlAction);

    return result;
  }

  /**
   * Process Promise Query function helper
   * @param {DocumentNode} gqlAction {DocumentNode}
   */
  function processPromisedQuery<TResult = any>(
    gqlAction: DocumentParameter<TResult>
  ) {
    const enableQuery = ref(false);
    const {
      onResult,
      loading: queryLoading,
      onError,
    } = useQuery(gqlAction, variables ? variables : {}, () => ({
      enabled: enableQuery.value,
      notifyOnNetworkStatusChange: false,
    }));

    const apolloQuery = () =>
      new Promise<ApolloQueryResult<TResult>>((resolve, reject) => {
        enableQuery.value = true;

        onResult((res) => {
          if (!res.loading) {
            enableQuery.value = false;

            if (!res.data) {
              reject("no data");
            }
            resolve(res);
          }
        });

        onError((err) => {
          enableQuery.value = false;
          console.error(err);
          reject(err);
        });
      });

    return {
      apolloQuery,
      queryLoading,
    };
  }

  /**
   * Processor function
   */
  async function __process() {
    const query: DocumentNode | false | null =
      action === GraphqlActions.DIVING_TYPES
        ? QUERY_DIVING_TYPES
        : action === GraphqlActions.DIVING_ENVIRONMENTS
        ? QUERY_DIVING_ENVIRONMENTS
        : action === GraphqlActions.DIVING_ROLES
        ? QUERY_DIVING_ROLES
        : action === GraphqlActions.GAS_BY_DIVES
        ? QUERY_GASTANKS_BY_DIVES
        : null;

    if (
      !action ||
      query === null ||
      !Object.values(GraphqlActions).includes(action)
    ) {
      throw "GraphQL action to process is not unknown!";
    }

    const { apolloQuery } = processPromisedQuery(query as DocumentNode);
    const { data } = await apolloQuery();
    return data;
  }

  return __process();
}
