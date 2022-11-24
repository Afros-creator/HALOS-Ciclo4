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
  PuestoC,
  Combos,
} from '../models';
import {PuestoCRepository} from '../repositories';

export class PuestoCCombosController {
  constructor(
    @repository(PuestoCRepository) protected puestoCRepository: PuestoCRepository,
  ) { }

  @get('/puesto-cs/{id}/combos', {
    responses: {
      '200': {
        description: 'Array of PuestoC has many Combos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Combos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Combos>,
  ): Promise<Combos[]> {
    return this.puestoCRepository.combos(id).find(filter);
  }

  @post('/puesto-cs/{id}/combos', {
    responses: {
      '200': {
        description: 'PuestoC model instance',
        content: {'application/json': {schema: getModelSchemaRef(Combos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof PuestoC.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Combos, {
            title: 'NewCombosInPuestoC',
            exclude: ['id'],
            optional: ['puestoCId']
          }),
        },
      },
    }) combos: Omit<Combos, 'id'>,
  ): Promise<Combos> {
    return this.puestoCRepository.combos(id).create(combos);
  }

  @patch('/puesto-cs/{id}/combos', {
    responses: {
      '200': {
        description: 'PuestoC.Combos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Combos, {partial: true}),
        },
      },
    })
    combos: Partial<Combos>,
    @param.query.object('where', getWhereSchemaFor(Combos)) where?: Where<Combos>,
  ): Promise<Count> {
    return this.puestoCRepository.combos(id).patch(combos, where);
  }

  @del('/puesto-cs/{id}/combos', {
    responses: {
      '200': {
        description: 'PuestoC.Combos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Combos)) where?: Where<Combos>,
  ): Promise<Count> {
    return this.puestoCRepository.combos(id).delete(where);
  }
}
