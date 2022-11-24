import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarVentasComponent } from './modificar-ventas.component';

describe('ModificarVentasComponent', () => {
  let component: ModificarVentasComponent;
  let fixture: ComponentFixture<ModificarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
