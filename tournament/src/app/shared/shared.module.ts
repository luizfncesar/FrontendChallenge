import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { TableTeamListComponent } from '../components/table-team-list/table-team-list.component';
import { TableTournamentListComponent } from '../components/table-tournament-list/table-tournament-list.component';



@NgModule({
  declarations: [TableComponent, BreadcrumbComponent, TableTeamListComponent, TableTournamentListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    BreadcrumbComponent,
    TableTeamListComponent,
    TableTournamentListComponent
  ]
})
export class SharedModule { }
