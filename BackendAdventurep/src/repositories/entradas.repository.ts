import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Entradas, EntradasRelations} from '../models';

export class EntradasRepository extends DefaultCrudRepository<
  Entradas,
  typeof Entradas.prototype.id,
  EntradasRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Entradas, dataSource);
  }
}
