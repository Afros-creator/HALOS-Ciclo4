import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPuestocomidaComponent } from './consultar-puestocomida.component';

describe('ConsultarPuestocomidaComponent', () => {
  let component: ConsultarPuestocomidaComponent;
  let fixture: ComponentFixture<ConsultarPuestocomidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPuestocomidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarPuestocomidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
