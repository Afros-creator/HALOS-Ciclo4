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
import {Combos} from '../models';
import {CombosRepository} from '../repositories';

export class ComboController {
  constructor(
    @repository(CombosRepository)
    public combosRepository : CombosRepository,
  ) {}

  @post('/combos')
  @response(200, {
    description: 'Combos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Combos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Combos, {
            title: 'NewCombos',
            exclude: ['id'],
          }),
        },
      },
    })
    combos: Omit<Combos, 'id'>,
  ): Promise<Combos> {
    return this.combosRepository.create(combos);
  }

  @get('/combos/count')
  @response(200, {
    description: 'Combos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Combos) where?: Where<Combos>,
  ): Promise<Count> {
    return this.combosRepository.count(where);
  }

  @get('/combos')
  @response(200, {
    description: 'Array of Combos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Combos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Combos) filter?: Filter<Combos>,
  ): Promise<Combos[]> {
    return this.combosRepository.find(filter);
  }

  @patch('/combos')
  @response(200, {
    description: 'Combos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Combos, {partial: true}),
        },
      },
    })
    combos: Combos,
    @param.where(Combos) where?: Where<Combos>,
  ): Promise<Count> {
    return this.combosRepository.updateAll(combos, where);
  }

  @get('/combos/{id}')
  @response(200, {
    description: 'Combos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Combos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Combos, {exclude: 'where'}) filter?: FilterExcludingWhere<Combos>
  ): Promise<Combos> {
    return this.combosRepository.findById(id, filter);
  }

  @patch('/combos/{id}')
  @response(204, {
    description: 'Combos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Combos, {partial: true}),
        },
      },
    })
    combos: Combos,
  ): Promise<void> {
    await this.combosRepository.updateById(id, combos);
  }

  @put('/combos/{id}')
  @response(204, {
    description: 'Combos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() combos: Combos,
  ): Promise<void> {
    await this.combosRepository.replaceById(id, combos);
  }

  @del('/combos/{id}')
  @response(204, {
    description: 'Combos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.combosRepository.deleteById(id);
  }
}
