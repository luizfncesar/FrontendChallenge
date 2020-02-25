import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-table-team-list',
  templateUrl: './table-team-list.component.html',
  styleUrls: ['./table-team-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TableTeamListComponent implements OnInit {

  @Input() event: any[] = [];
  constructor() { }

  ngOnInit() {
    
  }

}
