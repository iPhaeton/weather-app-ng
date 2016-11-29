import { Component, OnInit } from '@angular/core';
import { ProvideService } from "../provide.service";

@Component({
  selector: 'app-weather-box',
  templateUrl: './weather-box.component.html',
  styleUrls: ['./weather-box.component.css']
})
export class WeatherBoxComponent implements OnInit {

  constructor(private provide: ProvideService) { }

  ngOnInit() {
    this.provide.location((err, pos) => {
      this.provide.weather(pos, (err, weatherData) => {
        if (err) return console.log(err);

        console.log(weatherData);
      });
    });
  }

}
