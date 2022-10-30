import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Restriccion, RestriccionRelations} from '../models';

export class RestriccionRepository extends DefaultCrudRepository<
  Restriccion,
  typeof Restriccion.prototype.id,
  RestriccionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Restriccion, dataSource);
  }
}
