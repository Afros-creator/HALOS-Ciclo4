import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUserModel } from 'src/app/modelos/credenciales-user.modelo';
import { SeguridadService } from 'src/app/servicios/shared/seguridad.service';
var cryptoJS = require("crypto-js")
declare const GenerarVentanaModal:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;


  formulariologin: FormGroup=new FormGroup({});
  mostrar:Boolean=true;

  constructor(
    private fb: FormBuilder,
    private serviciosseguridad: SeguridadService
  ) { }
  ngOnInit(): void {
    this.CostruccionFormulario();
  }

  CostruccionFormulario(){
    this.formulariologin=this.fb.group({
      user:["",[Validators.required,Validators.email]],
      pass:["",[Validators.required, Validators.minLength(8)]]
    });
  }

  login(){
    if(this.formulariologin.invalid){
      this.mostrar=false;
      GenerarVentanaModal("los datos son validos");
    }else{
      let datos = new credencialesUserModel();
      datos.usuario=this.formulariologin.controls['user'].value;
      datos.password=cryptoJS.mD5(this.formulariologin.controls['pass'].value).tostring();
      this.serviciosseguridad.login(datos).subscribe({
        next: (data:any)=>console.log(data),
        error:(e)=>console.log(e)
      });
      

    }
    }
  }

