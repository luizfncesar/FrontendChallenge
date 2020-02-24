import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTournamentListComponent } from './table-tournament-list.component';

describe('TableTournamentListComponent', () => {
  let component: TableTournamentListComponent;
  let fixture: ComponentFixture<TableTournamentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTournamentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTournamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
