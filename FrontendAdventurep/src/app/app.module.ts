import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './extras/plantilla/header/header.component';
import { NavbarComponent } from './extras/plantilla/navbar/navbar.component';
import { FooterComponent } from './extras/plantilla/footer/footer.component';
import { HomeComponent } from './extras/pages/home/home.component';
import { PagenotFoundComponent } from './extras/pages/pagenot-found/pagenot-found.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PagenotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
