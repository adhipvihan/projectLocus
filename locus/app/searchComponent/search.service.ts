import {Http} from "angular2/http";
import {Injectable} from 'angular2/core';
import {WeatherComponent} from '../weatherComponent/weather.component';
import {YelpComponent} from '../yelpComponent/yelp.component';
import {EventComponent} from '../eventComponent/event.component';
import {FoursquareComponent} from "../foursquareComponent/foursquare.component";
import 'rxjs/add/operator/map';
import * as Collections from 'typescript-collections';
import {Location} from '../location';

@Injectable()
export class SearchService {
    
    private _serverUrl = "http://localhost:4000"
    constructor(private _http: Http) {
        
    }

    getLocationList(locationPrefix) {
        var finalUrl = this._serverUrl + "/api/city/" + locationPrefix;
        console.log("Hitting url for location : " + finalUrl);
        return this._http.get(finalUrl)
            .map(res => {
                var result = res.json();
                var cityKeySet = [];
                for(var i = 0; i < result.length; i++) {
                    cityKeySet.push(result[i].cityKey);
                }
                return cityKeySet; 

            });

    }

    getZipCodeList(zipCodePrefix) {
        var finalUrl = this._serverUrl + "/api/zipcode/" + zipCodePrefix;
        console.log("Hitting url for zipcode : " + finalUrl);
        return this._http.get(finalUrl)
            .map(res => {
                var result = res.json();
                var zipcodeKeys = [];
                for(var i = 0; i < result.length; i++) {
                    zipcodeKeys.push(result[i].zipCode);
                }
                return zipcodeKeys; 

            });
    }

    getCityKey(cityName, stateName, stateCode) {
        return cityName + ", "+ stateName +"(" + stateCode + ")"; 
    }

    startSearch(cityName: string, searchByCity) {
        
        return [this.getWeatherComponent(cityName, searchByCity),
            this.getYelpComponent(cityName, searchByCity),
            this.getEventComponent(cityName, searchByCity),
            this.getFoursquareComponent(cityName, searchByCity)]
    }

    getWeatherComponent(cityName: string, isSearchByCity) {
        var weatherComponent = {
            type: WeatherComponent,
            selectedCity: cityName,
            searchByCity: isSearchByCity
        }
        return weatherComponent;
    }

    getYelpComponent(cityName: string, isSearchByCity) {
        var yelpComponent = {
            type: YelpComponent,
            selectedCity: cityName,
            searchByCity: isSearchByCity
        }
        return yelpComponent;
    }

    getEventComponent(cityName: string, isSearchByCity) {
        var eventComponent = {
            type: EventComponent,
            selectedCity: cityName,
            searchByCity: isSearchByCity
        }
        return eventComponent;
    }

    getFoursquareComponent(cityName: string, isSearchByCity) {
        var foursquareComponent = {
            type: FoursquareComponent,
            selectedCity: cityName,
            searchByCity: isSearchByCity
        }
        return foursquareComponent;
    }

    
}