import {Entity, model, property, hasOne} from '@loopback/repository';
import {ParqueDiver} from './parque-diver.model';

@model()
export class Ciudad extends Entity {
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
  })
  departamentoId?: string;

  @hasOne(() => ParqueDiver)
  parqueDiver: ParqueDiver;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
