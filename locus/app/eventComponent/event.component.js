System.register(['angular2/core', './event.service', '../app.service', '../location'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, event_service_1, app_service_1, location_1;
    var EventComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (event_service_1_1) {
                event_service_1 = event_service_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            },
            function (location_1_1) {
                location_1 = location_1_1;
            }],
        execute: function() {
            EventComponent = (function () {
                function EventComponent(cdRef, _eventService, _appService) {
                    this.cdRef = cdRef;
                    this._eventService = _eventService;
                    this._appService = _appService;
                    this.isLoading = true;
                    this.isExpanded = false;
                }
                EventComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.searchByCity) {
                        // Search by city name
                        this._appService.validateCity(this.selectedCity)
                            .subscribe(function (res) {
                            if (res.length == 0) {
                                return;
                            }
                            _this.selectedLocation = new location_1.Location(res[0].zipCode, res[0].stateCode, res[0].cityName, res[0].stateName, res[0].lattitude, res[0].longitude, res[0].cityKey);
                            // Call event service
                            // this._eventService.getPopularEvents(this.selectedLocation)
                            //     .subscribe(res => {
                            //         console.log(res);
                            //         this.eventsArray = res.search.events.event;
                            //     })
                            _this._eventService.getEvents(_this.selectedLocation.zipCode);
                            _this.y = _this._eventService.notifyParent
                                .subscribe(function (item) {
                                _this.eventsArray = item.events.event;
                                console.log(_this.eventsArray);
                                _this.isLoading = false;
                                _this.cdRef.detectChanges();
                                console.log(_this.isLoading);
                            }, function (error) {
                                _this.errorMessage = error;
                                console.log("error: ", _this.errorMessage);
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
                            // Call event service
                            //    this._eventService.getPopularEvents(this.selectedLocation)
                            //         .subscribe(res => {
                            //             console.log(res);
                            //             this.eventsArray = res.search.events.event;
                            //         })
                            _this._eventService.getEvents(_this.selectedLocation.zipCode);
                            _this.y = _this._eventService.notifyParent
                                .subscribe(function (item) {
                                _this.eventsArray = item.events.event;
                                console.log(_this.eventsArray);
                                _this.isLoading = false;
                                _this.cdRef.detectChanges();
                                console.log(_this.isLoading);
                            }, function (error) {
                                _this.errorMessage = error;
                                console.log("error: ", _this.errorMessage);
                            });
                        });
                    }
                };
                EventComponent.prototype.dateFormatter = function (data) {
                };
                EventComponent.prototype.toggle = function () {
                    this.isExpanded = !this.isExpanded;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], EventComponent.prototype, "isLoading", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], EventComponent.prototype, "eventsArray", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], EventComponent.prototype, "performersArray", void 0);
                EventComponent = __decorate([
                    core_1.Component({
                        selector: 'location-events',
                        templateUrl: 'app/eventComponent/event.component.html',
                        styleUrls: ['app/eventComponent/event.component.css'],
                        providers: [event_service_1.EventService]
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef, event_service_1.EventService, app_service_1.AppService])
                ], EventComponent);
                return EventComponent;
            })();
            exports_1("EventComponent", EventComponent);
        }
    }
});
//# sourceMappingURL=event.component.js.map