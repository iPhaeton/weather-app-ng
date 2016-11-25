import { Component, OnInit } from '@angular/core';
import { ProvideService } from "../provide.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private provide: ProvideService) {}

  ngOnInit() {
    this.provide.location((err, pos) => {
      if (err) console.log(err);
      else console.log(pos);
    });
  }

}
