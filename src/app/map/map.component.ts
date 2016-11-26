import { Component, OnInit, ElementRef } from '@angular/core';
import { ProvideService } from "../provide.service";
declare var google: any;

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

      var mapProperties = {
        center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(this.elem.nativeElement.querySelector("#canvas"), mapProperties);
    });
  }

}
