import {Entity, model, property} from '@loopback/repository';

@model()
export class Entradas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  vendedorId?: string;

  constructor(data?: Partial<Entradas>) {
    super(data);
  }
}

export interface EntradasRelations {
  // describe navigational properties here
}

export type EntradasWithRelations = Entradas & EntradasRelations;
