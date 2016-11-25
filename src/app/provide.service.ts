import { Injectable } from '@angular/core';
import { NoSupportError } from "./errors/errors";

@Injectable()
export class ProvideService {

  constructor() {}

  storedLocation: any;

  location (callback, refresh:boolean = false) {
    if (this.storedLocation && !refresh) callback(null, this.storedLocation);
    else this._getLocation((err, pos) => {
      callback(err, pos)
    });
  }

  _getLocation (callback) {
    if (!navigator.geolocation) {
      return callback(new NoSupportError("Geolocation"));
    };

    navigator.geolocation.getCurrentPosition((pos) => {
      this.storedLocation = pos;
      callback(null, pos);
    }, (err) => {
      callback(err);
    }, {
      timeout: 30000
    });
  }

}
