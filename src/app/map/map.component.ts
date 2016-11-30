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
      if (err) return console.log(err);
      else console.log(pos);

      this.provide.map(this.elem.nativeElement.querySelector("#canvas"), (err, map) => {
        if (err) return console.log(err);

        this.provide.place((err, place) => {
          if (err) return console.log(err);
          else console.log(place);
          this.provide.init();
        })
      });
    });
  }

}
