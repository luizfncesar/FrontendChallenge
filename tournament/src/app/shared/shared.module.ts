import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../components/table/table.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [TableComponent, BreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
