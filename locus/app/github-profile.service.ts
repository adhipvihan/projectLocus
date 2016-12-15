import {Http} from "angular2/http";
import {HTTP_PROVIDERS} from "angular2/http";
import "rxjs/add/operator/map";
import {Injectable} from "angular2/core";

@Injectable()
export class GithubProfileService {
    private _baseUrl = "https://api.github.com/users/";
    constructor(private _http: Http) {

    }

    getUser(username) {
        console.log("Fetching user");
        return this._http.get(this._baseUrl+username)
            .map(res => res.json());
    }

    getFollowers(username) {
        console.log("Fetching followers");
        return this._http.get(this._baseUrl+username+"/followers")
            .map(res => res.json());
    }

}