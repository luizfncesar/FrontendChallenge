import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TournamentRoutingModule } from './tournament-routing.module';
import { ValoranComponent } from './valoran/valoran.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamListComponent } from './team-list/team-list.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';


@NgModule({
  declarations: [ValoranComponent, TeamListComponent, TournamentListComponent],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TournamentModule { }
