import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Zona, ZonaRelations, PuestoC, Atraccion} from '../models';
import {PuestoCRepository} from './puesto-c.repository';
import {AtraccionRepository} from './atraccion.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly puestocomidas: HasManyRepositoryFactory<PuestoC, typeof Zona.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PuestoCRepository') protected puestoCRepositoryGetter: Getter<PuestoCRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Zona, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.puestocomidas = this.createHasManyRepositoryFactoryFor('puestocomidas', puestoCRepositoryGetter,);
    this.registerInclusionResolver('puestocomidas', this.puestocomidas.inclusionResolver);
  }
}
