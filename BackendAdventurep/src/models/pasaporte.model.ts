import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Entradas} from './entradas.model';
import {Atraccion} from './atraccion.model';

@model()
export class Pasaporte extends Entity {
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
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidadatracciones: number;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @belongsTo(() => Entradas)
  entradasId: string;

  @hasMany(() => Atraccion)
  atraccions: Atraccion[];

  constructor(data?: Partial<Pasaporte>) {
    super(data);
  }
}

export interface PasaporteRelations {
  // describe navigational properties here
}

export type PasaporteWithRelations = Pasaporte & PasaporteRelations;
