import { Injectable } from '@angular/core';
import { NoSupportError, ServerResponseError } from "./errors/errors";

@Injectable()
export class ProvideService {

  constructor() {}

  _storedLocation: any;

  //location------------------------------------------------------------------------------------------------------------
  location (callback, refresh:boolean = false) {
    if (this._storedLocation && !refresh) callback(null, this._storedLocation);
    else this._getLocation((err, pos) => {
      callback(err, pos)
    });
  }

  _getLocation (callback) {
    if (!navigator.geolocation) {
      return callback(new NoSupportError("Geolocation"));
    };

    navigator.geolocation.getCurrentPosition((pos) => {
      this._storedLocation = pos;
      callback(null, pos);
    }, (err) => {
      callback(err);
    }, {
      timeout: 30000
    });
  }

  //weather data--------------------------------------------------------------------------------------------------------
  weather (pos, callback) {
    var request = new XMLHttpRequest();
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&APPID=1087fe193c7a359e56fd688c0da44085`
    request.open("GET", url, true);
    request.send();

    request.onload = function () {
      callback (null, request.responseText);
    };
    request. onerror = function () {
      callback(new ServerResponseError(request.status, request.statusText));
    }
  }

}

//make location and weather into getters
//add index.ts to errors
//cashing
//is storing location in a variable necessary?
