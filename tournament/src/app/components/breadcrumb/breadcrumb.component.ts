import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BreadcrumbComponent implements OnInit {

  @Input() iconBreadcrumb: string;
  @Input() titleBreadcrumb: string;

  constructor() { }

  ngOnInit() {
  }

}
