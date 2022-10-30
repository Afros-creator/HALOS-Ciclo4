import {Entity, model, property} from '@loopback/repository';

@model()
export class Combos extends Entity {
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
  Descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
  })
  puestoCId?: string;

  constructor(data?: Partial<Combos>) {
    super(data);
  }
}

export interface CombosRelations {
  // describe navigational properties here
}

export type CombosWithRelations = Combos & CombosRelations;
