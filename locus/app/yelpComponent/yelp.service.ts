import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Location} from '../location';
import 'rxjs/add/operator/map';

@Injectable()
export class YelpService {

    private _serverUrl = "http://localhost:4000";

    constructor(private _http : Http) {
        
    }


    getRestaurants(location : Location) {
        var cityName = this.getFormattedCityName(location.cityName);
        var latLong = this.getLatLong(location.lattidue, location.longitude);

        var finalUrl = this._serverUrl + "/api/yelp?cityName=" + cityName + "&latLong=" + latLong;
        console.log("Yelp hitting url : " + finalUrl);
        return this._http.get(finalUrl)
            .map(res => res.json());
    }

    getFormattedCityName(cityName: string) {
        return cityName.split(' ').join('+');
    }

    getLatLong(lat, long) {
        return lat + ',' + long;
    }
    
}