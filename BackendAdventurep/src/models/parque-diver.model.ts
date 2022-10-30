import {Entity, model, property, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {Cliente} from './cliente.model';

@model()
export class ParqueDiver extends Entity {
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
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'number',
    required: true,
  })
  Aforo: number;

  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @property({
    type: 'string',
  })
  ciudadId?: string;

  @hasMany(() => Zona)
  zonas: Zona[];

  @hasMany(() => Cliente)
  clientes: Cliente[];

  constructor(data?: Partial<ParqueDiver>) {
    super(data);
  }
}

export interface ParqueDiverRelations {
  // describe navigational properties here
}

export type ParqueDiverWithRelations = ParqueDiver & ParqueDiverRelations;
