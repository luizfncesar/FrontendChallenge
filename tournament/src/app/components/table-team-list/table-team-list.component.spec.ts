import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTeamListComponent } from './table-team-list.component';

describe('TableTeamListComponent', () => {
  let component: TableTeamListComponent;
  let fixture: ComponentFixture<TableTeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTeamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
