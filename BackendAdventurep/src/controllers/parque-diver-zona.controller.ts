import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ParqueDiver,
  Zona,
} from '../models';
import {ParqueDiverRepository} from '../repositories';

export class ParqueDiverZonaController {
  constructor(
    @repository(ParqueDiverRepository) protected parqueDiverRepository: ParqueDiverRepository,
  ) { }

  @get('/parque-divers/{id}/zonas', {
    responses: {
      '200': {
        description: 'Array of ParqueDiver has many Zona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Zona>,
  ): Promise<Zona[]> {
    return this.parqueDiverRepository.zonas(id).find(filter);
  }

  @post('/parque-divers/{id}/zonas', {
    responses: {
      '200': {
        description: 'ParqueDiver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ParqueDiver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {
            title: 'NewZonaInParqueDiver',
            exclude: ['id'],
            optional: ['parqueDiverId']
          }),
        },
      },
    }) zona: Omit<Zona, 'id'>,
  ): Promise<Zona> {
    return this.parqueDiverRepository.zonas(id).create(zona);
  }

  @patch('/parque-divers/{id}/zonas', {
    responses: {
      '200': {
        description: 'ParqueDiver.Zona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zona, {partial: true}),
        },
      },
    })
    zona: Partial<Zona>,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.parqueDiverRepository.zonas(id).patch(zona, where);
  }

  @del('/parque-divers/{id}/zonas', {
    responses: {
      '200': {
        description: 'ParqueDiver.Zona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Zona)) where?: Where<Zona>,
  ): Promise<Count> {
    return this.parqueDiverRepository.zonas(id).delete(where);
  }
}
