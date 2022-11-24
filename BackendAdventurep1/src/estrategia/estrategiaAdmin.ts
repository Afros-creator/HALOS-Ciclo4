import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";

import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";
import { service } from "@loopback/core";

export class EstrategiaAdmin implements AuthenticationStrategy{
    name: string ="admin";

    constructor(
        @service (AutenticacionService)
        public servicioAutentication: AutenticacionService
    ){}

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token =parseBearerToken(request);
        if (token){
            let datos=this.servicioAutentication.ValidarToken(token);
            if (datos) {
                if(datos.data.rol=="Administrador"){
                    let perfil: UserProfile = Object.assign({
                        nombre: datos.data.nombre
                    });

                return perfil;
            }else{
                throw new HttpErrors[401]("No tienes permiso de acceso a este recurso")
            }
            } else {
                throw new HttpErrors[401]("el token no es valido")
            }

        } else {
            throw new HttpErrors[401]("No hay un token para esta solicitud")
        }

    }
}