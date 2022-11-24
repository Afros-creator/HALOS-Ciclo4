import {Entity, model, property, hasMany} from '@loopback/repository';
import {Entradas} from './entradas.model';

@model()
export class Vendedor extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Identificacion: string;

  @hasMany(() => Entradas)
  entradas: Entradas[];

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
