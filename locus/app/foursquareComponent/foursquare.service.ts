import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Location} from '../location';
import 'rxjs/add/operator/map';

@Injectable()
export class FoursquareService {
    
    private _serverUrl = "http://localhost:4000";

    constructor(private _http : Http) {
        
    }

    getPopularPlaces(location : Location) {
        var latLong = this.getLatLong(location.lattidue, location.longitude);
        var finalUrl = this._serverUrl + "/api/foursquare/exploreVenues?latLong=" + latLong;

        console.log("Foursquare hitting url : " + finalUrl);
        return this._http.get(finalUrl)
            .map(res => res.json());

    }    

    getLatLong(lat, long) {
        return lat + ',' + long;
    }

}