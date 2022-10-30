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
  Atraccion,
  Restriccion,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionRestriccionController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/restriccions', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Restriccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restriccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Restriccion>,
  ): Promise<Restriccion[]> {
    return this.atraccionRepository.restricciones(id).find(filter);
  }

  @post('/atraccions/{id}/restriccions', {
    responses: {
      '200': {
        description: 'Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restriccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriccion, {
            title: 'NewRestriccionInAtraccion',
            exclude: ['id'],
            optional: ['atraccionId']
          }),
        },
      },
    }) restriccion: Omit<Restriccion, 'id'>,
  ): Promise<Restriccion> {
    return this.atraccionRepository.restricciones(id).create(restriccion);
  }

  @patch('/atraccions/{id}/restriccions', {
    responses: {
      '200': {
        description: 'Atraccion.Restriccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restriccion, {partial: true}),
        },
      },
    })
    restriccion: Partial<Restriccion>,
    @param.query.object('where', getWhereSchemaFor(Restriccion)) where?: Where<Restriccion>,
  ): Promise<Count> {
    return this.atraccionRepository.restricciones(id).patch(restriccion, where);
  }

  @del('/atraccions/{id}/restriccions', {
    responses: {
      '200': {
        description: 'Atraccion.Restriccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Restriccion)) where?: Where<Restriccion>,
  ): Promise<Count> {
    return this.atraccionRepository.restricciones(id).delete(where);
  }
}
