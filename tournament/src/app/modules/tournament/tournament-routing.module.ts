import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValoranComponent } from './valoran/valoran.component';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  {
    path: '',
    component: ValoranComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
