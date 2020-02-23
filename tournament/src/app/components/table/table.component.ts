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
  @Input() listTable: any[] = [];

  @Output() changeStatus: EventEmitter<any> = new EventEmitter();
  @Output() deleteProduct: EventEmitter<string> = new EventEmitter();
  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickStatus(product: any) {
    this.closeDropdown();
    this.changeStatus.emit(product);
  }

  deleteItem(id: string) {
    this.closeDropdown();
    this.deleteProduct.emit(id);
  }

  openRegister() {
    const param = {
      type: 'register'
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
