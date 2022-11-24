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
import {Restriccion} from '../models';
import {RestriccionRepository} from '../repositories';

export class RestriccionesController {
  constructor(
    @repository(RestriccionRepository)
    public restriccionRepository : RestriccionRepository,
  ) {}

  @post('/restriccions')
  @response(200, {
    description: 'Restriccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Restriccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriccion, {
            title: 'NewRestriccion',
            exclude: ['id'],
          }),
        },
      },
    })
    restriccion: Omit<Restriccion, 'id'>,
  ): Promise<Restriccion> {
    return this.restriccionRepository.create(restriccion);
  }

  @get('/restriccions/count')
  @response(200, {
    description: 'Restriccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Restriccion) where?: Where<Restriccion>,
  ): Promise<Count> {
    return this.restriccionRepository.count(where);
  }

  @get('/restriccions')
  @response(200, {
    description: 'Array of Restriccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Restriccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Restriccion) filter?: Filter<Restriccion>,
  ): Promise<Restriccion[]> {
    return this.restriccionRepository.find(filter);
  }

  @patch('/restriccions')
  @response(200, {
    description: 'Restriccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriccion, {partial: true}),
        },
      },
    })
    restriccion: Restriccion,
    @param.where(Restriccion) where?: Where<Restriccion>,
  ): Promise<Count> {
    return this.restriccionRepository.updateAll(restriccion, where);
  }

  @get('/restriccions/{id}')
  @response(200, {
    description: 'Restriccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Restriccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Restriccion, {exclude: 'where'}) filter?: FilterExcludingWhere<Restriccion>
  ): Promise<Restriccion> {
    return this.restriccionRepository.findById(id, filter);
  }

  @patch('/restriccions/{id}')
  @response(204, {
    description: 'Restriccion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriccion, {partial: true}),
        },
      },
    })
    restriccion: Restriccion,
  ): Promise<void> {
    await this.restriccionRepository.updateById(id, restriccion);
  }

  @put('/restriccions/{id}')
  @response(204, {
    description: 'Restriccion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() restriccion: Restriccion,
  ): Promise<void> {
    await this.restriccionRepository.replaceById(id, restriccion);
  }

  @del('/restriccions/{id}')
  @response(204, {
    description: 'Restriccion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.restriccionRepository.deleteById(id);
  }
}
