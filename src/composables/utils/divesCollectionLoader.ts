import { ApolloQueryResult } from "@apollo/client";
import { DiveInterface } from "@/types/global/dive";
import { GasTank } from "@/types/global/gas";

/**
 * Dives Collection Loader util
 * @param {ApolloQueryResult} collection ApolloQueryResult
 * @param {string} context string
 * @param {string} subProp string
 * @return {Partial<DiveInterface>[] | Record<string, number>}
 */
export function useDivesCollectionLoader(
  collection: ApolloQueryResult<any>,
  context?: string,
  subProp?: string
): Partial<DiveInterface>[] | GasTank[] | Record<string, number> {
  const key = "dives";
  const tokens: string[] = [];
  const items: Partial<DiveInterface>[] | GasTank[] = [];
  const themesTokensItems: Record<string, any> = {};

  collection[key as keyof typeof collection].edges
    .map((item: { node: unknown }) => item.node)
    .forEach((dive: any) => {
      if (context && context === "gasTanks") {
        const gasTanks = dive.gasTanks;

        gasTanks.forEach((tank: GasTank) => {
          items.push(tank);
        });
      } else if (context && context === "themesTokens") {
        if (dive[subProp as keyof typeof dive].token) {
          tokens.push(dive[subProp as keyof typeof dive].token);
        } else {
          dive[subProp as keyof typeof dive].edges
            .map((item: { node: unknown }) => item.node)
            .forEach((object: any) => {
              tokens.push(object.token);
            });
        }
      } else {
        items.push(dive);
      }
    });

  if (context && context === "themesTokens") {
    tokens.forEach((token: string) => {
      const propName = token.replaceAll("%", "");
      themesTokensItems[propName as keyof typeof themesTokensItems]
        ? themesTokensItems[propName as keyof typeof themesTokensItems]++
        : (themesTokensItems[propName as keyof typeof themesTokensItems] = 1);
    });
  }

  return context && context === "themesTokens" ? themesTokensItems : items;
}
