import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PuestoC, PuestoCRelations, Combos} from '../models';
import {CombosRepository} from './combos.repository';

export class PuestoCRepository extends DefaultCrudRepository<
  PuestoC,
  typeof PuestoC.prototype.id,
  PuestoCRelations
> {

  public readonly combos: HasManyRepositoryFactory<Combos, typeof PuestoC.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CombosRepository') protected combosRepositoryGetter: Getter<CombosRepository>,
  ) {
    super(PuestoC, dataSource);
    this.combos = this.createHasManyRepositoryFactoryFor('combos', combosRepositoryGetter,);
    this.registerInclusionResolver('combos', this.combos.inclusionResolver);
  }
}
