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
  Pasaporte,
  Atraccion,
} from '../models';
import {PasaporteRepository} from '../repositories';

export class PasaporteAtraccionController {
  constructor(
    @repository(PasaporteRepository) protected pasaporteRepository: PasaporteRepository,
  ) { }

  @get('/pasaportes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Array of Pasaporte has many Atraccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.pasaporteRepository.atraccions(id).find(filter);
  }

  @post('/pasaportes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Pasaporte model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pasaporte.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccionInPasaporte',
            exclude: ['id'],
            optional: ['pasaporteId']
          }),
        },
      },
    }) atraccion: Omit<Atraccion, 'id'>,
  ): Promise<Atraccion> {
    return this.pasaporteRepository.atraccions(id).create(atraccion);
  }

  @patch('/pasaportes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Pasaporte.Atraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Partial<Atraccion>,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.pasaporteRepository.atraccions(id).patch(atraccion, where);
  }

  @del('/pasaportes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Pasaporte.Atraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.pasaporteRepository.atraccions(id).delete(where);
  }
}
