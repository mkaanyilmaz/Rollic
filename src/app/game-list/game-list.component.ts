import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Game } from '../models/games.model';
import * as GameAction from '../actions/games.actions';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  oldSearchValue: string = '';

  games: Game[];
  searchValue: any;

  searchedGames: Game[] = [];
  constructor(private store: Store<AppState>, private router: Router) {
    store.select('games').subscribe((response: Game[]) => {
      response.length > 0 ? (this.games = response) : '';
    });
  }

  ngOnInit(): void {}

  search(event) {
    this.searchedGames = [];
    if (event === '' || event.length < 2) {
      this.searchedGames = [];
    } else {
      this.games
        .filter((x) => x.gameName.includes(event))
        .map((y) => {
          this.searchedGames.push(y);
        });
    }
  }

  addNewGame() {
    this.router.navigateByUrl('/game-creation-page');
  }

  deleteGame(index) {
    console.warn(index);
    this.store.dispatch(new GameAction.RemoveGame(index));
    this.store.select('games').subscribe((response: Game[]) => {
      this.games = response;
    });
  }
}
