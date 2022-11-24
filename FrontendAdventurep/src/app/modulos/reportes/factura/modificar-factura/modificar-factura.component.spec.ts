import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFacturaComponent } from './modificar-factura.component';

describe('ModificarFacturaComponent', () => {
  let component: ModificarFacturaComponent;
  let fixture: ComponentFixture<ModificarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
