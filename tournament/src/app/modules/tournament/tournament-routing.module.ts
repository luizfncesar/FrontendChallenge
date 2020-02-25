import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValoranComponent } from './valoran/valoran.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';



const routes: Routes = [

  // { path: '', 
  //   redirectTo: '/tournament-list'
  // },
  {
    path: 'tournament/:id',
    component: ValoranComponent
  },
  {
    path: 'tournament-list',
    component: TournamentListComponent
  },
  {
    path: 'team-list/:id',
    component: TeamListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
