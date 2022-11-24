import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Combos, CombosRelations} from '../models';

export class CombosRepository extends DefaultCrudRepository<
  Combos,
  typeof Combos.prototype.id,
  CombosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Combos, dataSource);
  }
}
