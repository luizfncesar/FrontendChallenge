import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-table-tournament-list',
  templateUrl: './table-tournament-list.component.html',
  styleUrls: ['./table-tournament-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableTournamentListComponent implements OnInit {

  @Input() nameList: string;
  @Input() listTournament: any[] = [];

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @Output() deleteTourney: EventEmitter<string> = new EventEmitter();
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  @Output() openPageTourney: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickStatus(id: string) {
    this.closeDropdown();
    this.changeStatus.emit(id);
    debugger
  }

  deleteItem(id: string) {
    debugger
    this.closeDropdown();
    this.deleteTourney.emit(id);
  }

  openPage(id: string) {
    this.openPageTourney.emit(id);
  }

  openRegister() {
    const param = {
      type: 'register'
    }
    this.openModal.emit(param);
  }

  openEdit(tournament: any) {
    this.closeDropdown();
    const param = {
      item: tournament,
      type: 'edit'
    }
    this.openModal.emit(param);
  }

  private closeDropdown() {
    UIkit.dropdown('#dropdown').hide();
  }

}
