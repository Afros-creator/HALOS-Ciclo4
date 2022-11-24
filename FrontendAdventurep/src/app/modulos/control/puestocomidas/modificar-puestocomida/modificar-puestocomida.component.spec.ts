import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPuestocomidaComponent } from './modificar-puestocomida.component';

describe('ModificarPuestocomidaComponent', () => {
  let component: ModificarPuestocomidaComponent;
  let fixture: ComponentFixture<ModificarPuestocomidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPuestocomidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPuestocomidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
