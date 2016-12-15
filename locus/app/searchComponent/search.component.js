System.register(['angular2/core', 'angular2/common', './search.service', '../app.service', '../weatherComponent/weather.component', '../yelpComponent/yelp.component', '../eventComponent/event.component', '../dclwrapper.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, search_service_1, app_service_1, weather_component_1, yelp_component_1, event_component_1, dclwrapper_component_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (search_service_1_1) {
                search_service_1 = search_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
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
            function (dclwrapper_component_1_1) {
                dclwrapper_component_1 = dclwrapper_component_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent(fb, _searchService, _appService) {
                    this._searchService = _searchService;
                    this._appService = _appService;
                    // Placeholders
                    this.currentPlaceHolder = "Search by city name...";
                    this.cityPlaceHolder = "Search by city name...";
                    this.zipcodePlaceHolder = "Search by zip code...";
                    // Flags
                    this.isSearch = false;
                    this.isLoading = false;
                    this.isNotPresent = false;
                    this.isError = false;
                    this.searchByCity = true;
                    this.debouncedSearch = _.debounce(function (event) {
                        var _this = this;
                        var locationPrefix = event.target.value;
                        console.log("value is " + locationPrefix);
                        if (locationPrefix.length < 3) {
                            return;
                        }
                        if (locationPrefix.indexOf(',') != -1) {
                            return;
                        }
                        if (!this.searchByCity && locationPrefix.length >= 5) {
                            return;
                        }
                        this.isLoading = true;
                        this.isNotPresent = false;
                        this.isError = false;
                        if (this.searchByCity) {
                            this._searchService.getLocationList(locationPrefix)
                                .subscribe(function (res) {
                                var datalist = $("#locationDataList");
                                datalist.empty();
                                for (var i = 0; i < res.length; i++) {
                                    var opt = $("<option></option").attr("value", res[i]);
                                    datalist.append(opt);
                                }
                            }, function (error) {
                                _this.isLoading = false;
                                _this.isError = true;
                                console.log(error);
                            }, function (complete) {
                                _this.isLoading = false;
                            });
                        }
                        else {
                            this._searchService.getZipCodeList(locationPrefix)
                                .subscribe(function (res) {
                                var datalist = $("#locationDataList");
                                datalist.empty();
                                console.log(res);
                                for (var i = 0; i < res.length; i++) {
                                    var opt = $("<option></option").attr("value", res[i]);
                                    datalist.append(opt);
                                }
                            }, function (error) {
                                _this.isLoading = false;
                                _this.isError = true;
                                console.log(error);
                            }, function (complete) {
                                _this.isLoading = false;
                            });
                        }
                    }, 500);
                    this.form = fb.group({
                        city: ['', common_1.Validators.compose([common_1.Validators.required])]
                    });
                }
                SearchComponent.prototype.radioClick = function (event) {
                    var clicked = event.target.id;
                    if (clicked == "searchCity") {
                        this.searchByCity = true;
                        this.currentPlaceHolder = this.cityPlaceHolder;
                        $("#city").val('');
                        var datalist = $("#locationDataList");
                        datalist.empty();
                    }
                    else if (clicked == "searchZipcode") {
                        this.searchByCity = false;
                        this.currentPlaceHolder = this.zipcodePlaceHolder;
                        $("#city").val('');
                        var datalist = $("#locationDataList");
                        datalist.empty();
                    }
                };
                SearchComponent.prototype.search = function () {
                    var _this = this;
                    if (!this.form.value) {
                        return;
                    }
                    this._cityName = this.form.value.city;
                    console.log("Search is :" + this.searchByCity);
                    if (this.searchByCity) {
                        // Search by cit name
                        this._appService.validateCity(this._cityName)
                            .subscribe(function (res) {
                            console.log(res.length);
                            if (res.length == 0) {
                                _this.isNotPresent = true;
                            }
                            else {
                                // Only if city is present at the backend, launch all components.
                                _this.isNotPresent = false;
                                var componentList = _this._searchService.startSearch(_this._cityName, _this.searchByCity);
                                _this.weatherComponent = componentList[0];
                                _this.yelpComponent = componentList[1];
                                _this.eventComponent = componentList[2];
                                _this.foursquareComponent = componentList[3];
                                _this.isSearch = true;
                            }
                        });
                    }
                    else {
                        // Search by zipcode
                        this._appService.validateZipCode(this._cityName)
                            .subscribe(function (res) {
                            console.log(res.length);
                            if (res.length == 0) {
                                _this.isNotPresent = true;
                            }
                            else {
                                // Only if zipcode is present at the backend, launch all components.
                                _this.isNotPresent = false;
                                var componentList = _this._searchService.startSearch(_this._cityName, _this.searchByCity);
                                _this.weatherComponent = componentList[0];
                                _this.yelpComponent = componentList[1];
                                _this.eventComponent = componentList[2];
                                _this.foursquareComponent = componentList[3];
                                _this.isSearch = true;
                            }
                        });
                    }
                };
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'search-location',
                        templateUrl: 'app/searchComponent/search.component.html',
                        styles: [
                            "\n            .reg_name {\n                max-width:200px;\n            }\n        "
                        ],
                        providers: [search_service_1.SearchService],
                        directives: [weather_component_1.WeatherComponent, yelp_component_1.YelpComponent, event_component_1.EventComponent, dclwrapper_component_1.DclWrapper]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, search_service_1.SearchService, app_service_1.AppService])
                ], SearchComponent);
                return SearchComponent;
            })();
            exports_1("SearchComponent", SearchComponent);
        }
    }
});
//# sourceMappingURL=search.component.js.map