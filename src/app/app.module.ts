import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeadMenuComponent } from './head-menu/head-menu.component';
import { MapComponent } from './map/map.component';
import { ProvideService } from "./provide.service";
import { WeatherBoxComponent } from './weather-box/weather-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadMenuComponent,
    MapComponent,
    WeatherBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProvideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
