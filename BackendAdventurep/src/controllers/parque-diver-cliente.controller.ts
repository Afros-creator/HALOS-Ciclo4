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
  Cliente,
} from '../models';
import {ParqueDiverRepository} from '../repositories';

export class ParqueDiverClienteController {
  constructor(
    @repository(ParqueDiverRepository) protected parqueDiverRepository: ParqueDiverRepository,
  ) { }

  @get('/parque-divers/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of ParqueDiver has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.parqueDiverRepository.clientes(id).find(filter);
  }

  @post('/parque-divers/{id}/clientes', {
    responses: {
      '200': {
        description: 'ParqueDiver model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ParqueDiver.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInParqueDiver',
            exclude: ['id'],
            optional: ['parqueDiverId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.parqueDiverRepository.clientes(id).create(cliente);
  }

  @patch('/parque-divers/{id}/clientes', {
    responses: {
      '200': {
        description: 'ParqueDiver.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.parqueDiverRepository.clientes(id).patch(cliente, where);
  }

  @del('/parque-divers/{id}/clientes', {
    responses: {
      '200': {
        description: 'ParqueDiver.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.parqueDiverRepository.clientes(id).delete(where);
  }
}
