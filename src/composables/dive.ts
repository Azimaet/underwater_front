import { Dive, DiveInterface } from "@/types/contents/dive";

import { reactive } from "vue";

interface State {
  dive: DiveInterface | null;
}

const state: State = reactive({
  dive: null,
});

/**
 * Global Dive Manager. Used to represents new dive (for print it by form) or dive fetched by API.
 * @return {DiveInterface} dive DiveInterface
 */
export function useDive() {
  /**
   * Init object Dive function.
   * @return {Promise} Promise
   */
  async function initDive(): Promise<Dive> {
    return new Promise((resolve) => {
      state.dive = new Dive();

      resolve(state.dive);
    });
  }

  initDive();

  return state.dive;
}
