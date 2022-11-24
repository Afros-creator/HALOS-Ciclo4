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
  Cliente,
  Entradas,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteEntradasController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/entradas', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Entradas',
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
    return this.clienteRepository.entradas(id).find(filter);
  }

  @post('/clientes/{id}/entradas', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Entradas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Entradas, {
            title: 'NewEntradasInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) entradas: Omit<Entradas, 'id'>,
  ): Promise<Entradas> {
    return this.clienteRepository.entradas(id).create(entradas);
  }

  @patch('/clientes/{id}/entradas', {
    responses: {
      '200': {
        description: 'Cliente.Entradas PATCH success count',
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
    return this.clienteRepository.entradas(id).patch(entradas, where);
  }

  @del('/clientes/{id}/entradas', {
    responses: {
      '200': {
        description: 'Cliente.Entradas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Entradas)) where?: Where<Entradas>,
  ): Promise<Count> {
    return this.clienteRepository.entradas(id).delete(where);
  }
}
