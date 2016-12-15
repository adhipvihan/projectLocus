System.register(['angular2/http', 'angular2/core', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1;
    var YelpService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {}],
        execute: function() {
            YelpService = (function () {
                function YelpService(_http) {
                    this._http = _http;
                    this._serverUrl = "http://localhost:4000";
                }
                YelpService.prototype.getRestaurants = function (location) {
                    var cityName = this.getFormattedCityName(location.cityName);
                    var latLong = this.getLatLong(location.lattidue, location.longitude);
                    var finalUrl = this._serverUrl + "/api/yelp?cityName=" + cityName + "&latLong=" + latLong;
                    console.log("Yelp hitting url : " + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) { return res.json(); });
                };
                YelpService.prototype.getFormattedCityName = function (cityName) {
                    return cityName.split(' ').join('+');
                };
                YelpService.prototype.getLatLong = function (lat, long) {
                    return lat + ',' + long;
                };
                YelpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], YelpService);
                return YelpService;
            })();
            exports_1("YelpService", YelpService);
        }
    }
});
//# sourceMappingURL=yelp.service.js.map