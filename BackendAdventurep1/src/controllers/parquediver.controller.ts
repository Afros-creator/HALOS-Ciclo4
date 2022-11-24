import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ParqueDiver} from '../models';
import {ParqueDiverRepository} from '../repositories';

export class ParquediverController {
  constructor(
    @repository(ParqueDiverRepository)
    public parqueDiverRepository : ParqueDiverRepository,
  ) {}

  @post('/parque-divers')
  @response(200, {
    description: 'ParqueDiver model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParqueDiver)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueDiver, {
            title: 'NewParqueDiver',
            exclude: ['id'],
          }),
        },
      },
    })
    parqueDiver: Omit<ParqueDiver, 'id'>,
  ): Promise<ParqueDiver> {
    return this.parqueDiverRepository.create(parqueDiver);
  }

  @get('/parque-divers/count')
  @response(200, {
    description: 'ParqueDiver model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParqueDiver) where?: Where<ParqueDiver>,
  ): Promise<Count> {
    return this.parqueDiverRepository.count(where);
  }

  @get('/parque-divers')
  @response(200, {
    description: 'Array of ParqueDiver model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParqueDiver, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParqueDiver) filter?: Filter<ParqueDiver>,
  ): Promise<ParqueDiver[]> {
    return this.parqueDiverRepository.find(filter);
  }

  @patch('/parque-divers')
  @response(200, {
    description: 'ParqueDiver PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueDiver, {partial: true}),
        },
      },
    })
    parqueDiver: ParqueDiver,
    @param.where(ParqueDiver) where?: Where<ParqueDiver>,
  ): Promise<Count> {
    return this.parqueDiverRepository.updateAll(parqueDiver, where);
  }

  @get('/parque-divers/{id}')
  @response(200, {
    description: 'ParqueDiver model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParqueDiver, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ParqueDiver, {exclude: 'where'}) filter?: FilterExcludingWhere<ParqueDiver>
  ): Promise<ParqueDiver> {
    return this.parqueDiverRepository.findById(id, filter);
  }

  @patch('/parque-divers/{id}')
  @response(204, {
    description: 'ParqueDiver PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParqueDiver, {partial: true}),
        },
      },
    })
    parqueDiver: ParqueDiver,
  ): Promise<void> {
    await this.parqueDiverRepository.updateById(id, parqueDiver);
  }

  @put('/parque-divers/{id}')
  @response(204, {
    description: 'ParqueDiver PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parqueDiver: ParqueDiver,
  ): Promise<void> {
    await this.parqueDiverRepository.replaceById(id, parqueDiver);
  }

  @del('/parque-divers/{id}')
  @response(204, {
    description: 'ParqueDiver DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parqueDiverRepository.deleteById(id);
  }
}
