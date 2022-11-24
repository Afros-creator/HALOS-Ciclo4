import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElimiarFacturaComponent } from './elimiar-factura.component';

describe('ElimiarFacturaComponent', () => {
  let component: ElimiarFacturaComponent;
  let fixture: ComponentFixture<ElimiarFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElimiarFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElimiarFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
