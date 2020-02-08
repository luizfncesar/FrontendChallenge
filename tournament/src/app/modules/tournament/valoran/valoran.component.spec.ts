import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoranComponent } from './valoran.component';

describe('ValoranComponent', () => {
  let component: ValoranComponent;
  let fixture: ComponentFixture<ValoranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
