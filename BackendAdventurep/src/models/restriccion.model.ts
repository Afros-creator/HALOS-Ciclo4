import {Entity, model, property} from '@loopback/repository';

@model()
export class Restriccion extends Entity {
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
  Parametros: string;

  @property({
    type: 'string',
  })
  atraccionId?: string;

  constructor(data?: Partial<Restriccion>) {
    super(data);
  }
}

export interface RestriccionRelations {
  // describe navigational properties here
}

export type RestriccionWithRelations = Restriccion & RestriccionRelations;
