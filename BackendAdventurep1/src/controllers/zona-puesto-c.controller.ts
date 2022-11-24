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
  Zona,
  PuestoC,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaPuestoCController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/puesto-cs', {
    responses: {
      '200': {
        description: 'Array of Zona has many PuestoC',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PuestoC)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PuestoC>,
  ): Promise<PuestoC[]> {
    return this.zonaRepository.puestocomidas(id).find(filter);
  }

  @post('/zonas/{id}/puesto-cs', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(PuestoC)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoC, {
            title: 'NewPuestoCInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) puestoC: Omit<PuestoC, 'id'>,
  ): Promise<PuestoC> {
    return this.zonaRepository.puestocomidas(id).create(puestoC);
  }

  @patch('/zonas/{id}/puesto-cs', {
    responses: {
      '200': {
        description: 'Zona.PuestoC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PuestoC, {partial: true}),
        },
      },
    })
    puestoC: Partial<PuestoC>,
    @param.query.object('where', getWhereSchemaFor(PuestoC)) where?: Where<PuestoC>,
  ): Promise<Count> {
    return this.zonaRepository.puestocomidas(id).patch(puestoC, where);
  }

  @del('/zonas/{id}/puesto-cs', {
    responses: {
      '200': {
        description: 'Zona.PuestoC DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PuestoC)) where?: Where<PuestoC>,
  ): Promise<Count> {
    return this.zonaRepository.puestocomidas(id).delete(where);
  }
}
