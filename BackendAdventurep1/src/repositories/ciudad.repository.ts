import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, ParqueDiver} from '../models';
import {ParqueDiverRepository} from './parque-diver.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly parqueDiver: HasOneRepositoryFactory<ParqueDiver, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParqueDiverRepository') protected parqueDiverRepositoryGetter: Getter<ParqueDiverRepository>,
  ) {
    super(Ciudad, dataSource);
    this.parqueDiver = this.createHasOneRepositoryFactoryFor('parqueDiver', parqueDiverRepositoryGetter);
    this.registerInclusionResolver('parqueDiver', this.parqueDiver.inclusionResolver);
  }
}
