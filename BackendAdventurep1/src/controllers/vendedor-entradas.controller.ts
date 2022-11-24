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
  Vendedor,
  Entradas,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorEntradasController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/entradas', {
    responses: {
      '200': {
        description: 'Array of Vendedor has many Entradas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entradas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Entradas>,
  ): Promise<Entradas[]> {
    return this.vendedorRepository.entradas(id).find(filter);
  }

  @post('/vendedors/{id}/entradas', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entradas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vendedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {
            title: 'NewEntradasInVendedor',
            exclude: ['id'],
            optional: ['vendedorId']
          }),
        },
      },
    }) entradas: Omit<Entradas, 'id'>,
  ): Promise<Entradas> {
    return this.vendedorRepository.entradas(id).create(entradas);
  }

  @patch('/vendedors/{id}/entradas', {
    responses: {
      '200': {
        description: 'Vendedor.Entradas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {partial: true}),
        },
      },
    })
    entradas: Partial<Entradas>,
    @param.query.object('where', getWhereSchemaFor(Entradas)) where?: Where<Entradas>,
  ): Promise<Count> {
    return this.vendedorRepository.entradas(id).patch(entradas, where);
  }

  @del('/vendedors/{id}/entradas', {
    responses: {
      '200': {
        description: 'Vendedor.Entradas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Entradas)) where?: Where<Entradas>,
  ): Promise<Count> {
    return this.vendedorRepository.entradas(id).delete(where);
  }
}
