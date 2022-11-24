import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Keys } from '../configuracion/Keys';
import {CambioPass, Usuario} from '../models';
import {Credenciales} from '../models';
import {UsuarioRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require("node-fetch");

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
    @service(AutenticacionService)
    public servicioautenticacion:AutenticacionService
  ) {} 

  @post('/registro')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> { 
    let password = this.servicioautenticacion.GenerarPassword();
    let passwordE = this.servicioautenticacion.EncriptarPassword(password);
    usuario.clave =passwordE;

    let p = await this.usuarioRepository.create(usuario);
    // Notificación
    let destino = p.correo;
    let asunto = 'Registro en la aplicación de AdventurePark';
    let contenido = `Hola, ${p.nombres}, su usuario es: ${p.correo}, 
    y su contraseña de acceso es: ${password}`
    fetch(`${Keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data:any)=>{
      console.log(data);
    });
    return p;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }

  /* 
  Métodos propios
  */
 
  @post('/Login',{
    responses:{
      '200':{
        description:"Identificacion de las personas"
      }
    }
  })
  async identificar(
    @requestBody() credenciales:Credenciales
  ):Promise<Usuario | null>{
    let clavecifrada=this.servicioautenticacion.EncriptarPassword(credenciales.Password);
    let usuario = await this.usuarioRepository.findOne({
      where:{
        correo:credenciales.Usuario,
        clave:clavecifrada
      }
    });
    return usuario;
  }
  
  @post('/LoginT')
  @response(200, {
    description: "Identificacion de personas con generacion de token"
  })
  async identificarT(
    @requestBody() credenciales: Credenciales
  ) {
    credenciales.Password = this.servicioautenticacion.EncriptarPassword(credenciales.Password);
    let p = await this.servicioautenticacion.IdentificarUsuario(credenciales);
    if (p) {
      let token = this.servicioautenticacion.GeneracionToken(p);
      return {
        datos: {
          nombre: p.nombres,
          id: p.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos Invalidaos!");
    }
  }

  @post('/recuperarPass')
  @response(200, {
    description:"Recuperacion contraseña del usuario"
  })
  async recuperar(
    @requestBody () email:string
  ):Promise<Boolean>{
    let user = await this.usuarioRepository.findOne({
      where:{
        correo: email
      }
    });
    if (user){
      let clave=this.servicioautenticacion.GenerarPassword();
      let clavecifrada=this.servicioautenticacion.EncriptarPassword(clave);
      user.clave=clavecifrada;
      await this.usuarioRepository.updateById(user.id, user);

      /**Notificacion */

      let destino = user.correo;
      let asunto = "recuperacion de clave de la app parque"
      let contenido =`Hola, ${user.nombres}, se ha realizado una recuperacion de su contraseña para el ingreso a nuestra app; su nueva contraseña es: ${clave}`;

      fetch(`http://localhost:5000/e-mail?email_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`).then((data:any)=>{
        console.log(data)
      });
      console.log("se ha enviado la nueva contraseña al usuario")
      return true;
    }else{
      console.log("El usuario no fue encontrado")
      return false;
    }
  }
  @post('/ModificarPass')
  @response(200, {
    description: "Modificar clave del usuario"
  })
  async modificar(
    @requestBody () datos:CambioPass
  ):Promise<Boolean>{
    let user= await this.usuarioRepository.findOne({
      where:{
        clave:this.servicioautenticacion.EncriptarPassword(datos.cActual)
      }
    });
    if (user) {
      if (datos.cNueva==datos.cValidada){
        user.clave=this.servicioautenticacion.EncriptarPassword(datos.cNueva);
        await this.usuarioRepository.updateById(user.id, user);
        /**Notificacion */

      let destino = user.correo;
      let asunto = "Modificacion de clave de la app parque"
      let contenido =`Hola, ${user.nombres}, usted a realizado un cambio en su contraseña; su nueva contraseña es: ${datos.cNueva}`;

      fetch(`http://localhost:5000/e-mail?email_destino=${destino}&asunto=${asunto}&mensaje=${contenido}`).then((data:any)=>{
        console.log(data)
      });
      console.log("El cambio fue exitoso");
      return false;
      }else{
        console.log("las contraseña  o coincide")
        return false;
      }

    }else{
      console.log("El usuario no existe en la BD")
      return false;
    }
  }
}
