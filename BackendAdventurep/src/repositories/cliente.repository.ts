import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Entradas} from '../models';
import {EntradasRepository} from './entradas.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly entradas: HasManyRepositoryFactory<Entradas, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EntradasRepository') protected entradasRepositoryGetter: Getter<EntradasRepository>,
  ) {
    super(Cliente, dataSource);
    this.entradas = this.createHasManyRepositoryFactoryFor('entradas', entradasRepositoryGetter,);
    this.registerInclusionResolver('entradas', this.entradas.inclusionResolver);
  }
}
