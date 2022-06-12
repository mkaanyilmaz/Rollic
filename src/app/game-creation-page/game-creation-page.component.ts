import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './../app.state';
import { Game } from './../models/games.model';
import * as GameAction from '../actions/games.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-creation-page',
  templateUrl: './game-creation-page.component.html',
  styleUrls: ['./game-creation-page.component.scss', '../app.component.scss'],
})
export class GameCreationPageComponent implements OnInit {
  games: Observable<Game[]>;
  regex = /^[a-zA-Z]+$/;
  gameForm = new FormGroup({
    gameName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regex),
    ]),
    bundle: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regex),
    ]),
    owner: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    image: new FormControl('', [Validators.required]),
  });

  imageBase64: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.games = store.select('games');
  }

  ngOnInit(): void {}

  addGame(gameName: string, bundle: string, owner: string) {
    let kaan: Game = {
      gameName: gameName,
      bundle: bundle,
      owner: owner,
      imageBase64: this.imageBase64,
    };
    this.store.dispatch(new GameAction.AddGame(kaan));
    this.toaster.success('You added a new games', 'success');
    this.router.navigateByUrl('/game-list');
  }

  file(event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        const imgBase64Path = e.target.result;
        this.imageBase64 = imgBase64Path;
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
