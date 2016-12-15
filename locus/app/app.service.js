System.register(["angular2/core", "angular2/http", 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AppService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppService = (function () {
                function AppService(_http) {
                    this._http = _http;
                    this._serverUrl = "http://localhost:4000";
                }
                AppService.prototype.validateCity = function (cityName) {
                    var finalUrl = this._serverUrl + "/api/validate?cityName=" + cityName;
                    console.log("Validation URL:" + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) {
                        return res.json();
                    });
                };
                AppService.prototype.validateZipCode = function (zipCode) {
                    var finalUrl = this._serverUrl + "/api/validate/zipcode/?zipcode=" + zipCode;
                    console.log("Validation URL:" + finalUrl);
                    return this._http.get(finalUrl)
                        .map(function (res) {
                        return res.json();
                    });
                };
                AppService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AppService);
                return AppService;
            })();
            exports_1("AppService", AppService);
        }
    }
});
//# sourceMappingURL=app.service.js.map