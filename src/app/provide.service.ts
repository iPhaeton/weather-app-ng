import { Injectable } from '@angular/core';
import { NoSupportError, ServerResponseError, UndefinedLocationError } from "./errors";

@Injectable()
export class ProvideService {

  constructor() {

  }

  map:any;
  googleMaps:any;

  _storedLocation:any;
  _storedPlace:any;
  _storedWeatherData:any = null;

  //location------------------------------------------------------------------------------------------------------------
  location (callback, refresh:boolean = false) {
    if (this._storedLocation && !refresh) callback(null, this._storedLocation);
    else this._getLocation(callback);
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

  //place---------------------------------------------------------------------------------------------------------------
  place (callback, refresh:boolean = false) {
    if (this._storedPlace && !refresh) callback(null, this._storedPlace);
    else this._getPlace(callback);
  }

  _getPlace (callback) {
    if (!this._storedLocation) return callback(new UndefinedLocationError("Position"));
    else if (!this.map) return callback(new UndefinedLocationError("Map"));

    var geocoder = new this.googleMaps.Geocoder;
    geocoder.geocode ({
      "location": {
        lat: this._storedLocation.coords.latitude,
        lng: this._storedLocation.coords.longitude
      }
    }, (results, status) => {
      if (status === this.googleMaps.GeocoderStatus.OK) {
        this._storedPlace = this._getCity(results);
        callback(null, this._storedPlace);
      }
      else if (status === this.googleMaps.GeocoderStatus.ZERO_RESULTS) {
        this._storedPlace = null;
        callback(null, "No people here");
      }
      else callback(new ServerResponseError(status, "Google maps Api error"));
    })
  }

  _getCity (results) {
    for (var i = results.length-1; i >= 0; i--) {
      for (var j = 0; j < results[i].types.length; j++) {
        if (results[i].types[j] === "locality") return results[i];
      };
    };
    return null;
  }

  //weather data--------------------------------------------------------------------------------------------------------
  weather (pos, callback, refresh:boolean = false) {
    if (this._storedWeatherData && !refresh) callback(null, this._storedWeatherData);
    else this._getWeather(pos, callback);
  }

  _getWeather (pos, callback) {
    var self = this;

    var request = new XMLHttpRequest();
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&APPID=1087fe193c7a359e56fd688c0da44085`
    request.open("GET", url, true);
    request.send();

    request.onload = function () {
      self._storedWeatherData = request.responseText;
      //clear stored weather data in 10 minutes
      setTimeout(() => {
        self._storedWeatherData = null;
      }, 600000);
      callback (null, self._storedWeatherData);
    };
    request. onerror = function () {
      callback(new ServerResponseError(request.status, request.statusText));
    }
  }

}

//make location and weather into getters
