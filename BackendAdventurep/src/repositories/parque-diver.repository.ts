import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ParqueDiver, ParqueDiverRelations, Zona, Cliente} from '../models';
import {ZonaRepository} from './zona.repository';
import {ClienteRepository} from './cliente.repository';

export class ParqueDiverRepository extends DefaultCrudRepository<
  ParqueDiver,
  typeof ParqueDiver.prototype.id,
  ParqueDiverRelations
> {

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof ParqueDiver.prototype.id>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof ParqueDiver.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(ParqueDiver, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
  }
}
