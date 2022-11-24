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
import {Entradas} from '../models';
import {EntradasRepository} from '../repositories';

export class EntradasController {
  constructor(
    @repository(EntradasRepository)
    public entradasRepository : EntradasRepository,
  ) {}

  @post('/entradas')
  @response(200, {
    description: 'Entradas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Entradas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {
            title: 'NewEntradas',
            exclude: ['id'],
          }),
        },
      },
    })
    entradas: Omit<Entradas, 'id'>,
  ): Promise<Entradas> {
    return this.entradasRepository.create(entradas);
  }

  @get('/entradas/count')
  @response(200, {
    description: 'Entradas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Entradas) where?: Where<Entradas>,
  ): Promise<Count> {
    return this.entradasRepository.count(where);
  }

  @get('/entradas')
  @response(200, {
    description: 'Array of Entradas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Entradas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Entradas) filter?: Filter<Entradas>,
  ): Promise<Entradas[]> {
    return this.entradasRepository.find(filter);
  }

  @patch('/entradas')
  @response(200, {
    description: 'Entradas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {partial: true}),
        },
      },
    })
    entradas: Entradas,
    @param.where(Entradas) where?: Where<Entradas>,
  ): Promise<Count> {
    return this.entradasRepository.updateAll(entradas, where);
  }

  @get('/entradas/{id}')
  @response(200, {
    description: 'Entradas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Entradas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Entradas, {exclude: 'where'}) filter?: FilterExcludingWhere<Entradas>
  ): Promise<Entradas> {
    return this.entradasRepository.findById(id, filter);
  }

  @patch('/entradas/{id}')
  @response(204, {
    description: 'Entradas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {partial: true}),
        },
      },
    })
    entradas: Entradas,
  ): Promise<void> {
    await this.entradasRepository.updateById(id, entradas);
  }

  @put('/entradas/{id}')
  @response(204, {
    description: 'Entradas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() entradas: Entradas,
  ): Promise<void> {
    await this.entradasRepository.replaceById(id, entradas);
  }

  @del('/entradas/{id}')
  @response(204, {
    description: 'Entradas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.entradasRepository.deleteById(id);
  }
}
