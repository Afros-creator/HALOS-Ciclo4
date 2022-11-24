import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Entradas} from '../models';
import {EntradasRepository} from './entradas.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly entradas: HasManyRepositoryFactory<Entradas, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EntradasRepository') protected entradasRepositoryGetter: Getter<EntradasRepository>,
  ) {
    super(Vendedor, dataSource);
    this.entradas = this.createHasManyRepositoryFactoryFor('entradas', entradasRepositoryGetter,);
    this.registerInclusionResolver('entradas', this.entradas.inclusionResolver);
  }
}
