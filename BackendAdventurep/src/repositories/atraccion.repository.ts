import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Restriccion} from '../models';
import {RestriccionRepository} from './restriccion.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {

  public readonly restricciones: HasManyRepositoryFactory<Restriccion, typeof Atraccion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RestriccionRepository') protected restriccionRepositoryGetter: Getter<RestriccionRepository>,
  ) {
    super(Atraccion, dataSource);
    this.restricciones = this.createHasManyRepositoryFactoryFor('restricciones', restriccionRepositoryGetter,);
    this.registerInclusionResolver('restricciones', this.restricciones.inclusionResolver);
  }
}
