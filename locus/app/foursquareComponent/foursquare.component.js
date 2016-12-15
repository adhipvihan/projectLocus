System.register(['angular2/core', './foursquare.service', '../app.service', '../location', '../zippy.component', "rxjs/add/observable/forkJoin"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, foursquare_service_1, app_service_1, location_1, zippy_component_1;
    var FoursquareComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (foursquare_service_1_1) {
                foursquare_service_1 = foursquare_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            },
            function (zippy_component_1_1) {
                zippy_component_1 = zippy_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            FoursquareComponent = (function () {
                function FoursquareComponent(_foursquareService, _appService) {
                    this._foursquareService = _foursquareService;
                    this._appService = _appService;
                    this.mapUrl = "https://www.google.com/maps/place/";
                    this.popularPlaces = [];
                    // flags
                    this.isExpanded = false;
                    this.isTipsExpanded = [];
                }
                FoursquareComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.searchByCity) {
                        // Search by city name
                        this._appService.validateCity(this.selectedCity)
                            .subscribe(function (res) {
                            if (res.length == 0) {
                                return;
                            }
                            _this.selectedLocation = new location_1.Location(res[0].zipCode, res[0].stateCode, res[0].cityName, res[0].stateName, res[0].lattitude, res[0].longitude, res[0].cityKey);
                            // Call foursquare service
                            _this._foursquareService.getPopularPlaces(_this.selectedLocation)
                                .subscribe(function (res) {
                                console.log("Recommended places to visit");
                                _this.popularPlaces = res.response.groups[0].items;
                                for (var i = 0; i < _this.popularPlaces.length; i++) {
                                    _this.isTipsExpanded.push(false);
                                }
                                console.log(_this.popularPlaces);
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
                            // Call foursquare service
                            _this._foursquareService.getPopularPlaces(_this.selectedLocation)
                                .subscribe(function (res) {
                                console.log("Recommended places to visit");
                                _this.popularPlaces = res.response.groups[0].items;
                                for (var i = 0; i < _this.popularPlaces.length; i++) {
                                    _this.isTipsExpanded.push(false);
                                }
                                console.log(_this.popularPlaces);
                            });
                        });
                    }
                };
                FoursquareComponent.prototype.toggle = function () {
                    this.isExpanded = !this.isExpanded;
                };
                FoursquareComponent.prototype.toggleTips = function (i) {
                    this.isTipsExpanded[i] = !this.isTipsExpanded[i];
                };
                FoursquareComponent = __decorate([
                    core_1.Component({
                        selector: 'location-popular-places',
                        styleUrls: ['app/foursquareComponent/foursquare.component.css'],
                        directives: [zippy_component_1.ZippyComponent],
                        templateUrl: 'app/foursquareComponent/foursquare.component.html',
                        providers: [foursquare_service_1.FoursquareService]
                    }), 
                    __metadata('design:paramtypes', [foursquare_service_1.FoursquareService, app_service_1.AppService])
                ], FoursquareComponent);
                return FoursquareComponent;
            })();
            exports_1("FoursquareComponent", FoursquareComponent);
        }
    }
});
//# sourceMappingURL=foursquare.component.js.map