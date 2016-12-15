System.register(['angular2/core', './yelp.service', '../app.service', '../location'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, yelp_service_1, app_service_1, location_1;
    var YelpComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (yelp_service_1_1) {
                yelp_service_1 = yelp_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            }],
        execute: function() {
            YelpComponent = (function () {
                function YelpComponent(_yelpService, _appService) {
                    this._yelpService = _yelpService;
                    this._appService = _appService;
                    this.restaurants = [];
                    this.mapUrl = "https://www.google.com/maps/place/";
                    this.isExpanded = true;
                }
                YelpComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.searchByCity) {
                        // Search by city name
                        this._appService.validateCity(this.selectedCity)
                            .subscribe(function (res) {
                            if (res.length == 0) {
                                return;
                            }
                            _this.selectedLocation = new location_1.Location(res[0].zipCode, res[0].stateCode, res[0].cityName, res[0].stateName, res[0].lattitude, res[0].longitude, res[0].cityKey);
                            _this._yelpService.getRestaurants(_this.selectedLocation)
                                .subscribe(function (res) {
                                console.log(res.toString());
                                _this.restaurants = res.businesses;
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
                            _this._yelpService.getRestaurants(_this.selectedLocation)
                                .subscribe(function (res) {
                                console.log(res);
                                _this.restaurants = res.businesses;
                            });
                        });
                    }
                };
                YelpComponent.prototype.toggle = function () {
                    this.isExpanded = !this.isExpanded;
                };
                YelpComponent = __decorate([
                    core_1.Component({
                        selector: 'location-restaurants',
                        templateUrl: 'app/yelpComponent/yelp.component.html',
                        styleUrls: ['app/yelpComponent/yelp.component.css'],
                        providers: [yelp_service_1.YelpService]
                    }), 
                    __metadata('design:paramtypes', [yelp_service_1.YelpService, app_service_1.AppService])
                ], YelpComponent);
                return YelpComponent;
            })();
            exports_1("YelpComponent", YelpComponent);
        }
    }
});
//# sourceMappingURL=yelp.component.js.map