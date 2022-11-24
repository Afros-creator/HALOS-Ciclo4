import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarPuestocomidaComponent } from './eliminar-puestocomida.component';

describe('EliminarPuestocomidaComponent', () => {
  let component: EliminarPuestocomidaComponent;
  let fixture: ComponentFixture<EliminarPuestocomidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarPuestocomidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarPuestocomidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
