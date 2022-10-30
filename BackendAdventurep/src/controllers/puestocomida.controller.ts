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
import {PuestoC} from '../models';
import {PuestoCRepository} from '../repositories';

export class PuestocomidaController {
  constructor(
    @repository(PuestoCRepository)
    public puestoCRepository : PuestoCRepository,
  ) {}

  @post('/puesto-cs')
  @response(200, {
    description: 'PuestoC model instance',
    content: {'application/json': {schema: getModelSchemaRef(PuestoC)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoC, {
            title: 'NewPuestoC',
            exclude: ['id'],
          }),
        },
      },
    })
    puestoC: Omit<PuestoC, 'id'>,
  ): Promise<PuestoC> {
    return this.puestoCRepository.create(puestoC);
  }

  @get('/puesto-cs/count')
  @response(200, {
    description: 'PuestoC model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PuestoC) where?: Where<PuestoC>,
  ): Promise<Count> {
    return this.puestoCRepository.count(where);
  }

  @get('/puesto-cs')
  @response(200, {
    description: 'Array of PuestoC model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PuestoC, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PuestoC) filter?: Filter<PuestoC>,
  ): Promise<PuestoC[]> {
    return this.puestoCRepository.find(filter);
  }

  @patch('/puesto-cs')
  @response(200, {
    description: 'PuestoC PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoC, {partial: true}),
        },
      },
    })
    puestoC: PuestoC,
    @param.where(PuestoC) where?: Where<PuestoC>,
  ): Promise<Count> {
    return this.puestoCRepository.updateAll(puestoC, where);
  }

  @get('/puesto-cs/{id}')
  @response(200, {
    description: 'PuestoC model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PuestoC, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PuestoC, {exclude: 'where'}) filter?: FilterExcludingWhere<PuestoC>
  ): Promise<PuestoC> {
    return this.puestoCRepository.findById(id, filter);
  }

  @patch('/puesto-cs/{id}')
  @response(204, {
    description: 'PuestoC PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoC, {partial: true}),
        },
      },
    })
    puestoC: PuestoC,
  ): Promise<void> {
    await this.puestoCRepository.updateById(id, puestoC);
  }

  @put('/puesto-cs/{id}')
  @response(204, {
    description: 'PuestoC PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() puestoC: PuestoC,
  ): Promise<void> {
    await this.puestoCRepository.replaceById(id, puestoC);
  }

  @del('/puesto-cs/{id}')
  @response(204, {
    description: 'PuestoC DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.puestoCRepository.deleteById(id);
  }
}
