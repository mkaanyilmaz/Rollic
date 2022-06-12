import { Action } from '@ngrx/store';
import { Game } from '../models/games.model';

export const ADD_GAME = '[GAMES] Add';
export const REMOVE_GAME = '[GAMES] Remove';

export class AddGame implements Action {
  readonly type = ADD_GAME;

  constructor(public payload: Game) {}
}
export class RemoveGame implements Action {
  readonly type = REMOVE_GAME;

  constructor(public payload: number) {}
}

export type Actions = AddGame | RemoveGame;
