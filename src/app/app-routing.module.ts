import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCreationPageComponent } from './game-creation-page/game-creation-page.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  { path: 'game-list', component: GameListComponent },
  { path: 'game-creation-page', component: GameCreationPageComponent },
  { path: '', redirectTo: '/game-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
