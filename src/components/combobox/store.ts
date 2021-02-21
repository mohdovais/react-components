import { randomId } from "./Combobox.utils";

export const ACTION_TYPE_COLLAPSE = 0;
export const ACTION_TYPE_EXPAND = 1;
export const ACTION_TYPE_DESCENDANT = 2;

export interface ComboboxState {
  listboxId: string;
  expanded: boolean;
  activeDescendant: string;
}

type ActionCollapse = {
  type: typeof ACTION_TYPE_COLLAPSE;
};
type ActionExpand = {
  type: typeof ACTION_TYPE_EXPAND;
};
type ActionDescendant = {
  type: typeof ACTION_TYPE_DESCENDANT;
  descendant: string;
};

type Action = ActionExpand | ActionCollapse | ActionDescendant;

function assign<S, T>(S: S, T: T): S & T {
  return Object.assign({}, S, T);
}

export const initialState: ComboboxState = {
  listboxId: "",
  expanded: false,
  activeDescendant: "",
};

export function initState(state: ComboboxState): ComboboxState {
  const id = randomId();
  return assign(state, {
    listboxId: id,
    activeDescendent: id,
  });
}

export function reducer(state: ComboboxState, action: Action): ComboboxState {
  switch (action.type) {
    case ACTION_TYPE_EXPAND:
      return assign(state, {
        expanded: true,
      });
    case ACTION_TYPE_COLLAPSE:
      return assign(state, {
        expanded: false,
        activeDescendant: state.listboxId,
      });
    case ACTION_TYPE_DESCENDANT:
      return assign(state, {
        activeDescendant: action.descendant,
        expanded: true,
      });
  }
  return state;
}
