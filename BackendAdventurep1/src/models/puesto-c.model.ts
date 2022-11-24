import {Entity, model, property, hasMany} from '@loopback/repository';
import {Combos} from './combos.model';

@model()
export class PuestoC extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @property({
    type: 'string',
  })
  zonaId?: string;

  @hasMany(() => Combos)
  combos: Combos[];

  constructor(data?: Partial<PuestoC>) {
    super(data);
  }
}

export interface PuestoCRelations {
  // describe navigational properties here
}

export type PuestoCWithRelations = PuestoC & PuestoCRelations;
