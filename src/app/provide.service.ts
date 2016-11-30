import { Injectable } from '@angular/core';
import { NoSupportError, ServerResponseError, UndefinedLocationError } from "./errors";
import { LocationInfo } from "./classes/LocationInfo";
import { BehaviorSubject } from "rxjs/BehaviorSubject"

@Injectable()
export class ProvideService {

  constructor() {

  }

  private _googleMaps:any;
  private _map:any;

  private locationInfo:LocationInfo = new LocationInfo();

  //events--------------------------------------------------------------------------------------------------------------
  private _ready = new BehaviorSubject({ready: false});
  public ready = this._ready.asObservable();

  init () {
    this._ready.next({ready: true});
  }
  //--------------------------------------------------------------------------------------------------------------------

  //map-----------------------------------------------------------------------------------------------------------------
  map (elem, callback) {
    if (!this.locationInfo.position) return callback(new UndefinedLocationError("Location"));
    if (!this._map) this._getMap(elem, callback);
    else callback(null, this._map);
  }

  _getMap (elem, callback) {
    var googleMapsApi = require("google-maps-api")("AIzaSyBIv5Z7Gmo-glNiiqhTqGfISRr-wTQ3MSE");
    googleMapsApi().then((googleMaps) => {
      this._googleMaps = googleMaps;
      var mapProperties = {
        center: new googleMaps.LatLng(this.locationInfo.position.latitude, this.locationInfo.position.longitude),
        zoom: 10,
        mapTypeId: googleMaps.MapTypeId.ROADMAP
      };

      this._map = new googleMaps.Map(elem, mapProperties);
      callback(null, this._map);
    }, (err) => {
      callback(err);
    });
  }

  //location------------------------------------------------------------------------------------------------------------
  location (callback, refresh:boolean = false) {
    if (this.locationInfo.position && !refresh) callback(null, this.locationInfo.position);
    else this._getLocation(callback);
  }

  _getLocation (callback) {
    if (!navigator.geolocation) {
      return callback(new NoSupportError("Geolocation"));
    };

    navigator.geolocation.getCurrentPosition((pos) => {
      this.locationInfo.position = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };
      callback(null, this.locationInfo.position);
    }, (err) => {
      callback(err);
    }, {
      timeout: 30000
    });
  }

  //place---------------------------------------------------------------------------------------------------------------
  place (callback, refresh:boolean = false) {
    if (this.locationInfo.place && !refresh) callback(null, this.locationInfo.place);
    else this._getPlace(callback);
  }

  _getPlace (callback) {
    if (!this.locationInfo.position) return callback(new UndefinedLocationError("Position"));
    else if (!this._map) return callback(new UndefinedLocationError("Map"));
    else if (!this._googleMaps) return callback(new UndefinedLocationError("Google maps API"));

    var geocoder = new this._googleMaps.Geocoder;
    geocoder.geocode ({
      "location": {
        lat: this.locationInfo.position.latitude,
        lng: this.locationInfo.position.longitude
      }
    }, (results, status) => {
      if (status === this._googleMaps.GeocoderStatus.OK) {
        this.locationInfo.place = this._getCity(results);
        callback(null, this.locationInfo.place);
      }
      else if (status === this._googleMaps.GeocoderStatus.ZERO_RESULTS) {
        this.locationInfo.place = null;
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
    if (this.locationInfo.weather && !refresh) callback(null, this.locationInfo.weather);
    else this._getWeather(pos, callback);
  }

  _getWeather (pos, callback) {
    var self = this;

    var request = new XMLHttpRequest();
    var url = `http://api.openweathermap.org/data/2.5/weather?lat=${pos.latitude}&lon=${pos.longitude}&APPID=1087fe193c7a359e56fd688c0da44085`
    request.open("GET", url, true);
    request.send();

    request.onload = function () {
      self.locationInfo.weather = JSON.parse(request.responseText);
      //clear stored weather data in 10 minutes
      setTimeout(() => {
        self.locationInfo.weather = null;
      }, 600000);
      callback (null, self.locationInfo.weather);
    };
    request. onerror = function () {
      callback(new ServerResponseError(request.status, request.statusText));
    }
  }

}

//ProvideService initialization
//can I pass data into a service constructor?
//think about what I want to use as a place
