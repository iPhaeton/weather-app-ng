import { Component, OnInit, ElementRef } from '@angular/core';
import { ProvideService } from "../provide.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private provide: ProvideService, private elem: ElementRef) {}

  ngOnInit() {
    this.provide.location((err, pos) => {
      if (err) console.log(err);
      else console.log(pos);

      var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");
      googleMapsApi().then((googleMaps) => {
        var mapProperties = {
          center: new googleMaps.LatLng(pos.coords.latitude, pos.coords.longitude),
          zoom: 10,
          mapTypeId: googleMaps.MapTypeId.ROADMAP
        };
        this.provide.googleMaps = googleMaps;
        this.provide.map = new googleMaps.Map(this.elem.nativeElement.querySelector("#canvas"), mapProperties);
        this.provide.place((err, place) => {
          if (err) console.log(err);
          else console.log(place);
        })
      }, (err) => {
        console.log(err);
      });
    });
  }

}
