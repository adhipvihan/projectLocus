System.register(['rxjs/add/operator/map', 'angular2/http', 'angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var http_1, core_1, core_2;
    var EventService;
    return {
        setters:[
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            EventService = (function () {
                function EventService(_http) {
                    this._http = _http;
                    this.notifyParent = new core_2.EventEmitter();
                    this._serverUrl = "http://localhost:4000";
                }
                EventService.prototype.getEvents = function (location) {
                    var m = this;
                    var oArgs = {
                        app_key: "DHcfQdPRdK3H43Kt",
                        //q: "music",
                        where: location,
                        //page_size: 5,
                        sort_order: "popularity",
                    };
                    EVDB.API.call("/events/search", oArgs, function (oData) {
                        var x = oData.events.event;
                        for (var i = 0; i < x.length; i++) {
                            x[i].start_time = x[i].start_time.slice(0, 11);
                        }
                        for (var i = 0; i < x.length; i++) {
                            if (x[i].performers == null)
                                continue;
                            else if (x[i].performers.performer.length >= 0) {
                                var performerBackup = x[i].performers.performer;
                                x[i].performers = new Array();
                                for (var j = 0; j < performerBackup.length; j++) {
                                    x[i].performers.push(performerBackup[j].name);
                                }
                            }
                            else {
                                var performerBackup = x[i].performers.performer;
                                x[i].performers = new Array();
                                x[i].performers.push(performerBackup.name);
                            }
                        }
                        console.log(x);
                        m.jsonData = oData;
                        m.notifyParent.emit(oData);
                    });
                };
                EventService.prototype.getPopularEvents = function (location) {
                    var finalUrl = this._serverUrl + "/api/events/findEvents?zipCode=" + location.zipCode;
                    console.log("Eventful hitting url : " + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) { return res.json(); });
                };
                EventService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EventService);
                return EventService;
            })();
            exports_1("EventService", EventService);
        }
    }
});
//# sourceMappingURL=event.service.js.map