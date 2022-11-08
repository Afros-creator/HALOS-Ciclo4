import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("generate-password");
const crypto = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

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
}
