import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pasaporte,
  Entradas,
} from '../models';
import {PasaporteRepository} from '../repositories';

export class PasaporteEntradasController {
  constructor(
    @repository(PasaporteRepository)
    public pasaporteRepository: PasaporteRepository,
  ) { }

  @get('/pasaportes/{id}/entradas', {
    responses: {
      '200': {
        description: 'Entradas belonging to Pasaporte',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Entradas)},
          },
        },
      },
    },
  })
  async getEntradas(
    @param.path.string('id') id: typeof Pasaporte.prototype.id,
  ): Promise<Entradas> {
    return this.pasaporteRepository.entradas(id);
  }
}
