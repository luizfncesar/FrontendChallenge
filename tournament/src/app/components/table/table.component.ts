import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  // @Input() nameList: string;
  @Input() event: any[] = [];

  @Input() winner: any;
  @Input() statusTourney: Boolean;

  @Output() changeResult: EventEmitter<any> = new EventEmitter();
  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    debugger
    let teste = this.statusTourney
  }

  clickResult(games: any, round: any) {
    debugger
    // this.closeDropdown();
    // this.changeResult.emit(round, game);
    const param = {
      games: games,
      round: round,
      type: 'edit'
    }
    this.openModal.emit(param);
  }

  openEdit(product: any) {
    this.closeDropdown();
    const param = {
      item: product,
      type: 'edit'
    }
    this.openModal.emit(param);
  }

  private closeDropdown() {
    UIkit.dropdown('#dropdown').hide();
  }

}
