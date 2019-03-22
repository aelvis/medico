import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaVerComponent } from './consulta-ver.component';

describe('ConsultaVerComponent', () => {
  let component: ConsultaVerComponent;
  let fixture: ComponentFixture<ConsultaVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
