System.register(['angular2/core', './weather.service', '../app.service', '../location', "rxjs/Observable", '../zippy.component', "rxjs/add/observable/forkJoin"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, weather_service_1, app_service_1, location_1, Observable_1, zippy_component_1;
    var WeatherComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (zippy_component_1_1) {
                zippy_component_1 = zippy_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            WeatherComponent = (function () {
                function WeatherComponent(_weatherService, _appService) {
                    this._weatherService = _weatherService;
                    this._appService = _appService;
                    this.forecast = [];
                    this.numDaysForecast = 3; // Can not be greater than 9.
                    // flags
                    this.isExpanded = false;
                    this.isMainExpanded = true;
                }
                WeatherComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.searchByCity) {
                        // Search by city name
                        this._appService.validateCity(this.selectedCity)
                            .subscribe(function (res) {
                            if (res.length == 0) {
                                return;
                            }
                            _this.selectedLocation = new location_1.Location(res[0].zipCode, res[0].stateCode, res[0].cityName, res[0].stateName, res[0].lattitude, res[0].longitude, res[0].cityKey);
                            Observable_1.Observable.forkJoin(_this._weatherService.getWeather(_this.selectedLocation), _this._weatherService.getWeatherForecast(_this.selectedLocation))
                                .subscribe(function (res) {
                                _this.weatherResponse = res[0];
                                console.log(res[0]);
                                _this.today = res[0].current_observation.local_time_rfc822.substring(5, 16);
                                console.log("Forecast is");
                                console.log(res[1]);
                                _this.forecast = res[1].forecast.simpleforecast.forecastday.splice(1, 1 + _this.numDaysForecast);
                                console.log(_this.forecast);
                            }, null, function () {
                                console.log("Weather request is completed..");
                            });
                        });
                    }
                    else {
                        // Search by zip code
                        this._appService.validateZipCode(this.selectedCity)
                            .subscribe(function (res) {
                            if (res.length == 0) {
                                return;
                            }
                            _this.selectedLocation = new location_1.Location(res[0].zipCode, res[0].stateCode, res[0].cityName, res[0].stateName, res[0].lattitude, res[0].longitude, res[0].cityKey);
                            Observable_1.Observable.forkJoin(_this._weatherService.getWeather(_this.selectedLocation), _this._weatherService.getWeatherForecast(_this.selectedLocation))
                                .subscribe(function (res) {
                                _this.weatherResponse = res[0];
                                console.log(res[0]);
                                _this.today = res[0].current_observation.local_time_rfc822.substring(5, 16);
                                console.log("Forecast is");
                                console.log(res[1]);
                                _this.forecast = res[1].forecast.simpleforecast.forecastday.splice(1, 1 + _this.numDaysForecast);
                                console.log(_this.forecast);
                            }, null, function () {
                                console.log("Weather request is completed..");
                            });
                        });
                    }
                };
                WeatherComponent.prototype.toggle = function () {
                    this.isExpanded = !this.isExpanded;
                };
                WeatherComponent.prototype.toggleMain = function () {
                    this.isMainExpanded = !this.isMainExpanded;
                };
                WeatherComponent.prototype.getFormattedDate = function (d) {
                    var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
                    return datestring;
                };
                WeatherComponent = __decorate([
                    core_1.Component({
                        selector: 'location-weather',
                        styleUrls: ['app/weatherComponent/weather.component.css'],
                        directives: [zippy_component_1.ZippyComponent],
                        templateUrl: 'app/weatherComponent/weather.component.html',
                        providers: [weather_service_1.WeatherService]
                    }), 
                    __metadata('design:paramtypes', [weather_service_1.WeatherService, app_service_1.AppService])
                ], WeatherComponent);
                return WeatherComponent;
            })();
            exports_1("WeatherComponent", WeatherComponent);
        }
    }
});
//# sourceMappingURL=weather.component.js.map