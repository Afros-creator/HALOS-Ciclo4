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
  Ciudad,
  ParqueDiver,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadParqueDiverController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/parque-diver', {
    responses: {
      '200': {
        description: 'Ciudad has one ParqueDiver',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParqueDiver),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ParqueDiver>,
  ): Promise<ParqueDiver> {
    return this.ciudadRepository.parqueDiver(id).get(filter);
  }

  @post('/ciudads/{id}/parque-diver', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParqueDiver)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueDiver, {
            title: 'NewParqueDiverInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) parqueDiver: Omit<ParqueDiver, 'id'>,
  ): Promise<ParqueDiver> {
    return this.ciudadRepository.parqueDiver(id).create(parqueDiver);
  }

  @patch('/ciudads/{id}/parque-diver', {
    responses: {
      '200': {
        description: 'Ciudad.ParqueDiver PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueDiver, {partial: true}),
        },
      },
    })
    parqueDiver: Partial<ParqueDiver>,
    @param.query.object('where', getWhereSchemaFor(ParqueDiver)) where?: Where<ParqueDiver>,
  ): Promise<Count> {
    return this.ciudadRepository.parqueDiver(id).patch(parqueDiver, where);
  }

  @del('/ciudads/{id}/parque-diver', {
    responses: {
      '200': {
        description: 'Ciudad.ParqueDiver DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ParqueDiver)) where?: Where<ParqueDiver>,
  ): Promise<Count> {
    return this.ciudadRepository.parqueDiver(id).delete(where);
  }
}
