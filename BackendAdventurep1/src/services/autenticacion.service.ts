import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Keys } from '../configuracion/Keys';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const generador = require("generate-password");
const crypto = require("crypto-js");
const JWT = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository (UsuarioRepository)
    public repositorioUsuario:UsuarioRepository
  ) {}

  GenerarPassword (){
    let password = generador.generate({
      length: 10,
      numbers: true
    });
    return password;
  }

  EncriptarPassword (password:string){
    let passwordE = crypto.MD5(password);
    return passwordE;
  }

  IdentificarUsuario(credenciales: Credenciales) {
    try {
      let p = this.repositorioUsuario.findOne({
        where: {
          correo:credenciales.Usuario,
          clave:credenciales.Password
        }
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  GeneracionToken(usuario : Usuario) {
    let token = JWT.sign({
      data: {
        id: usuario.id,
        Correo: usuario.correo,
        Nombre: usuario.nombres + " " + usuario.apellidos,
        rol: usuario.rol
      }
    },
      Keys.LlaveJWT);

    return token;
  }
  ValidarToken(token: string) {
    try {

      let datos = JWT.verify(token, Keys.LlaveJWT);
      return datos;

    } catch {

      return false;

    }
  }

}
