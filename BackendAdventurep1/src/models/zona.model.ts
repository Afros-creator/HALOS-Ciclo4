import {Entity, model, property, hasMany} from '@loopback/repository';
import {PuestoC} from './puesto-c.model';
import {Atraccion} from './atraccion.model';

@model()
export class Zona extends Entity {
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
    type: 'string',
    required: true,
  })
  Ubicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'string',
  })
  parqueDiverId?: string;

  @hasMany(() => PuestoC)
  puestocomidas: PuestoC[];

  @hasMany(() => Atraccion)
  atracciones: Atraccion[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
