import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPuestocomidaComponent } from './crear-puestocomida.component';

describe('CrearPuestocomidaComponent', () => {
  let component: CrearPuestocomidaComponent;
  let fixture: ComponentFixture<CrearPuestocomidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPuestocomidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPuestocomidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
