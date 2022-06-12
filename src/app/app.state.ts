import { Game } from './../app/models/games.model';

export interface AppState {
  readonly games: Game[];
}
