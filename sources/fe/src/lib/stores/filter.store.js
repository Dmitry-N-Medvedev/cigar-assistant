import {
  writable,
} from 'svelte/store';

const FILTERS = new Map();

function createFilterStore() {
  const {
    subscribe,
    update,
  } = writable(FILTERS);

  return {
    subscribe,
    setFilter: ({ name, value }) => update((currentState) => currentState.set(name, value)),
    populate: (itemValues) => update((currentState) => {
      for (const [k, v] of itemValues) {
        currentState.set(k, v);
      }

      return currentState;
    }),
  }
}

export const FilterStore = createFilterStore();