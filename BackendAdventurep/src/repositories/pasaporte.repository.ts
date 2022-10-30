import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pasaporte, PasaporteRelations, Entradas, Atraccion} from '../models';
import {EntradasRepository} from './entradas.repository';
import {AtraccionRepository} from './atraccion.repository';

export class PasaporteRepository extends DefaultCrudRepository<
  Pasaporte,
  typeof Pasaporte.prototype.id,
  PasaporteRelations
> {

  public readonly entradas: BelongsToAccessor<Entradas, typeof Pasaporte.prototype.id>;

  public readonly atraccions: HasManyRepositoryFactory<Atraccion, typeof Pasaporte.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EntradasRepository') protected entradasRepositoryGetter: Getter<EntradasRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Pasaporte, dataSource);
    this.atraccions = this.createHasManyRepositoryFactoryFor('atraccions', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atraccions', this.atraccions.inclusionResolver);
    this.entradas = this.createBelongsToAccessorFor('entradas', entradasRepositoryGetter,);
    this.registerInclusionResolver('entradas', this.entradas.inclusionResolver);
  }
}
