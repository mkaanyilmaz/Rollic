import * as GamesActions from '../actions/games.actions';
import { Game } from '../models/games.model';

const initialState: Game = {
  gameName: '',
  bundle: '',
  owner: '',
  imageBase64: '',
};

export function reducer(state: Game[] = [], action: GamesActions.Actions) {
  switch (action.type) {
    case GamesActions.ADD_GAME:
      return [...state, action.payload];
    case GamesActions.REMOVE_GAME:
      const array = [...state];
      array.splice(action.payload, 1);
      return array;
    default:
      return state;
  }
}
