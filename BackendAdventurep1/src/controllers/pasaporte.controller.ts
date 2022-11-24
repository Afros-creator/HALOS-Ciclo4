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
import {Pasaporte} from '../models';
import {PasaporteRepository} from '../repositories';

export class PasaporteController {
  constructor(
    @repository(PasaporteRepository)
    public pasaporteRepository : PasaporteRepository,
  ) {}

  @post('/pasaportes')
  @response(200, {
    description: 'Pasaporte model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pasaporte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasaporte, {
            title: 'NewPasaporte',
            exclude: ['id'],
          }),
        },
      },
    })
    pasaporte: Omit<Pasaporte, 'id'>,
  ): Promise<Pasaporte> {
    return this.pasaporteRepository.create(pasaporte);
  }

  @get('/pasaportes/count')
  @response(200, {
    description: 'Pasaporte model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pasaporte) where?: Where<Pasaporte>,
  ): Promise<Count> {
    return this.pasaporteRepository.count(where);
  }

  @get('/pasaportes')
  @response(200, {
    description: 'Array of Pasaporte model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pasaporte, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pasaporte) filter?: Filter<Pasaporte>,
  ): Promise<Pasaporte[]> {
    return this.pasaporteRepository.find(filter);
  }

  @patch('/pasaportes')
  @response(200, {
    description: 'Pasaporte PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasaporte, {partial: true}),
        },
      },
    })
    pasaporte: Pasaporte,
    @param.where(Pasaporte) where?: Where<Pasaporte>,
  ): Promise<Count> {
    return this.pasaporteRepository.updateAll(pasaporte, where);
  }

  @get('/pasaportes/{id}')
  @response(200, {
    description: 'Pasaporte model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pasaporte, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pasaporte, {exclude: 'where'}) filter?: FilterExcludingWhere<Pasaporte>
  ): Promise<Pasaporte> {
    return this.pasaporteRepository.findById(id, filter);
  }

  @patch('/pasaportes/{id}')
  @response(204, {
    description: 'Pasaporte PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pasaporte, {partial: true}),
        },
      },
    })
    pasaporte: Pasaporte,
  ): Promise<void> {
    await this.pasaporteRepository.updateById(id, pasaporte);
  }

  @put('/pasaportes/{id}')
  @response(204, {
    description: 'Pasaporte PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pasaporte: Pasaporte,
  ): Promise<void> {
    await this.pasaporteRepository.replaceById(id, pasaporte);
  }

  @del('/pasaportes/{id}')
  @response(204, {
    description: 'Pasaporte DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pasaporteRepository.deleteById(id);
  }
}
