import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarAtraccionComponent } from './consultar-atraccion.component';

describe('ConsultarAtraccionComponent', () => {
  let component: ConsultarAtraccionComponent;
  let fixture: ComponentFixture<ConsultarAtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarAtraccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarAtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
