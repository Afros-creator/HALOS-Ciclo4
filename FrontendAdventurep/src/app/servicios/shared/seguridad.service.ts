import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { credencialesUserModel } from 'src/app/modelos/credenciales-user.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  
  url: string="http://localhost:3000"
  constructor(
    private http:HttpClient
  ) { }

  login(credenciales:credencialesUserModel): Observable<any>{
    return this.http.post(`${this.url}/Login`, {
      usuario:credenciales.usuario,
      password:credenciales.password
    })

  }
}
