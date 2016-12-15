import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Location} from '../location';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {
    private _apiKey = "742aa913e122aa58";
    private _baseUrl = "http://api.wunderground.com/api/" + this._apiKey + "/conditions/q/";
    private _baseForecastUrl =   "http://api.wunderground.com/api/" + this._apiKey + "/forecast10day/q/";
    private _responseType = ".json";

    constructor(private _http: Http) {
        
    }

    getWeather(selectedLocation: Location) {

        return this._http.get(this.getWeatherUrl(selectedLocation.stateCode, selectedLocation.cityName))
             .map(res => res.json());
    }

    getWeatherForecast(selectedLocation: Location) {
        return this._http.get(this.getWeatherForecastUrl(selectedLocation.stateCode, selectedLocation.cityName))
            .map(res => res.json());
    }

    getWeatherUrl(stateCode: string, cityName: string) {
        var finalUrl = this._baseUrl + stateCode + "/" + cityName + this._responseType;
        console.log("Trying to reach : " + finalUrl);
        return finalUrl;
    }

    getWeatherForecastUrl(stateCode: string, cityName: string) {
        var finalUrl = this._baseForecastUrl + stateCode + "/" + cityName + this._responseType;
        console.log("Trying to reach : " + finalUrl);
        return finalUrl;
    }




}