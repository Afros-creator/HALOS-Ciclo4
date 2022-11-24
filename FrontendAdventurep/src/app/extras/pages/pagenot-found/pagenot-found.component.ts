import { Component, OnInit } from '@angular/core';
declare const GenerarVentanaModal:any;

@Component({
  selector: 'app-pagenot-found',
  templateUrl: './pagenot-found.component.html',
  styleUrls: ['./pagenot-found.component.css']
})
export class PagenotFoundComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    GenerarVentanaModal("la pagina esta caida")
  }
}
