import {Entity, model, property, hasMany} from '@loopback/repository';
import {Restriccion} from './restriccion.model';

@model()
export class Atraccion extends Entity {
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
    type: 'number',
    required: true,
  })
  Costo: number;

  @property({
    type: 'number',
    required: true,
  })
  Estatura_minima: number;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  Edad: number;

  @property({
    type: 'boolean',
    required: true,
  })
  Funcionando: boolean;

  @property({
    type: 'string',
  })
  zonaId?: string;

  @hasMany(() => Restriccion)
  restricciones: Restriccion[];

  @property({
    type: 'string',
  })
  pasaporteId?: string;

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
