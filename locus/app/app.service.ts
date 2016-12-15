import  {Injectable} from "angular2/core";
import * as Collections from 'typescript-collections';
import {Location} from './location';
import {Http} from "angular2/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
    private _serverUrl = "http://localhost:4000";
    constructor(private _http: Http) {
    
    }

    validateCity(cityName) {
        var finalUrl = this._serverUrl + "/api/validate?cityName=" + cityName;
        console.log("Validation URL:" + finalUrl);
        return this._http.get(finalUrl)
            .map(res => {
                return res.json(); 
            });
    }

    validateZipCode(zipCode) {
        var finalUrl = this._serverUrl + "/api/validate/zipcode/?zipcode=" + zipCode;
        console.log("Validation URL:" + finalUrl);
        return this._http.get(finalUrl)
            .map(res => {
                return res.json(); 
            });
    }
}