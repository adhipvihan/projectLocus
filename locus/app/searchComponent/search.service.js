System.register(["angular2/http", 'angular2/core', '../weatherComponent/weather.component', '../yelpComponent/yelp.component', '../eventComponent/event.component', "../foursquareComponent/foursquare.component", 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, weather_component_1, yelp_component_1, event_component_1, foursquare_component_1;
    var SearchService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (weather_component_1_1) {
                weather_component_1 = weather_component_1_1;
            },
            function (yelp_component_1_1) {
                yelp_component_1 = yelp_component_1_1;
            },
            function (event_component_1_1) {
                event_component_1 = event_component_1_1;
            },
            function (foursquare_component_1_1) {
                foursquare_component_1 = foursquare_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            SearchService = (function () {
                function SearchService(_http) {
                    this._http = _http;
                    this._serverUrl = "http://localhost:4000";
                }
                SearchService.prototype.getLocationList = function (locationPrefix) {
                    var finalUrl = this._serverUrl + "/api/city/" + locationPrefix;
                    console.log("Hitting url for location : " + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) {
                        var result = res.json();
                        var cityKeySet = [];
                        for (var i = 0; i < result.length; i++) {
                            cityKeySet.push(result[i].cityKey);
                        }
                        return cityKeySet;
                    });
                };
                SearchService.prototype.getZipCodeList = function (zipCodePrefix) {
                    var finalUrl = this._serverUrl + "/api/zipcode/" + zipCodePrefix;
                    console.log("Hitting url for zipcode : " + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) {
                        var result = res.json();
                        var zipcodeKeys = [];
                        for (var i = 0; i < result.length; i++) {
                            zipcodeKeys.push(result[i].zipCode);
                        }
                        return zipcodeKeys;
                    });
                };
                SearchService.prototype.getCityKey = function (cityName, stateName, stateCode) {
                    return cityName + ", " + stateName + "(" + stateCode + ")";
                };
                SearchService.prototype.startSearch = function (cityName, searchByCity) {
                    return [this.getWeatherComponent(cityName, searchByCity),
                        this.getYelpComponent(cityName, searchByCity),
                        this.getEventComponent(cityName, searchByCity),
                        this.getFoursquareComponent(cityName, searchByCity)];
                };
                SearchService.prototype.getWeatherComponent = function (cityName, isSearchByCity) {
                    var weatherComponent = {
                        type: weather_component_1.WeatherComponent,
                        selectedCity: cityName,
                        searchByCity: isSearchByCity
                    };
                    return weatherComponent;
                };
                SearchService.prototype.getYelpComponent = function (cityName, isSearchByCity) {
                    var yelpComponent = {
                        type: yelp_component_1.YelpComponent,
                        selectedCity: cityName,
                        searchByCity: isSearchByCity
                    };
                    return yelpComponent;
                };
                SearchService.prototype.getEventComponent = function (cityName, isSearchByCity) {
                    var eventComponent = {
                        type: event_component_1.EventComponent,
                        selectedCity: cityName,
                        searchByCity: isSearchByCity
                    };
                    return eventComponent;
                };
                SearchService.prototype.getFoursquareComponent = function (cityName, isSearchByCity) {
                    var foursquareComponent = {
                        type: foursquare_component_1.FoursquareComponent,
                        selectedCity: cityName,
                        searchByCity: isSearchByCity
                    };
                    return foursquareComponent;
                };
                SearchService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SearchService);
                return SearchService;
            })();
            exports_1("SearchService", SearchService);
        }
    }
});
//# sourceMappingURL=search.service.js.map