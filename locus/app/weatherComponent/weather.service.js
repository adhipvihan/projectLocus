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
    var WeatherService;
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
            WeatherService = (function () {
                function WeatherService(_http) {
                    this._http = _http;
                    this._apiKey = "742aa913e122aa58";
                    this._baseUrl = "http://api.wunderground.com/api/" + this._apiKey + "/conditions/q/";
                    this._baseForecastUrl = "http://api.wunderground.com/api/" + this._apiKey + "/forecast10day/q/";
                    this._responseType = ".json";
                }
                WeatherService.prototype.getWeather = function (selectedLocation) {
                    return this._http.get(this.getWeatherUrl(selectedLocation.stateCode, selectedLocation.cityName))
                        .map(function (res) { return res.json(); });
                };
                WeatherService.prototype.getWeatherForecast = function (selectedLocation) {
                    return this._http.get(this.getWeatherForecastUrl(selectedLocation.stateCode, selectedLocation.cityName))
                        .map(function (res) { return res.json(); });
                };
                WeatherService.prototype.getWeatherUrl = function (stateCode, cityName) {
                    var finalUrl = this._baseUrl + stateCode + "/" + cityName + this._responseType;
                    console.log("Trying to reach : " + finalUrl);
                    return finalUrl;
                };
                WeatherService.prototype.getWeatherForecastUrl = function (stateCode, cityName) {
                    var finalUrl = this._baseForecastUrl + stateCode + "/" + cityName + this._responseType;
                    console.log("Trying to reach : " + finalUrl);
                    return finalUrl;
                };
                WeatherService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], WeatherService);
                return WeatherService;
            })();
            exports_1("WeatherService", WeatherService);
        }
    }
});
//# sourceMappingURL=weather.service.js.map