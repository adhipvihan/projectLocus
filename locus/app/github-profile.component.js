System.register(["angular2/core", "./github-profile.service", "angular2/http", "rxjs/Observable", "rxjs/add/observable/forkJoin"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, github_profile_service_1, http_1, Observable_1;
    var GithubProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (github_profile_service_1_1) {
                github_profile_service_1 = github_profile_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            GithubProfileComponent = (function () {
                function GithubProfileComponent(_gitHubProfileService) {
                    this._gitHubProfileService = _gitHubProfileService;
                    this.isLoading = true;
                    this.user = {};
                    this.followers = [];
                    this._username = "gaylemcd";
                }
                GithubProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    Observable_1.Observable.forkJoin(this._gitHubProfileService.getUser(this._username), this._gitHubProfileService.getFollowers(this._username)).subscribe(function (res) {
                        console.log("Got both results");
                        _this.user = res[0],
                            _this.followers = res[1];
                    }, null, function () {
                        console.log("It is completed!!!!");
                        _this.isLoading = false;
                        console.log("is loading is " + _this.isLoading);
                    });
                };
                GithubProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'github-profile',
                        styles: ["\n        .avatar {\n            width: 100;\n            height: 100;\n            border-radios: 100%;\n        }\n    "],
                        template: "\n        <i *ngIf=\"isLoading\" class=\"fa fa-spinner fa-spin fa-3x\"></i>\n        <div *ngIf=\"isLoading == false\">\n            <h2>@{{ user.login }}</h2>\n            <a href=\"{{ user.html_url }}\" target=\"_blank\">\n                <img class= \"avatar\" src= \"{{ user.avatar_url }}\" />\n            </a>\n            <h3>Followers</h3>\n            \n            <div *ngFor=\"#follower of followers\" class=\"media\">\n                <div class=\"media-left\">\n                    <a href=\"{{ follower.html_url }}\" target=\"_blank\">\n                        <img class=\"media-object avatar\" src=\"{{ follower.avatar_url }}\" />\n                    </a>\n                </div>\n                <div class=\"media-body\">\n                    <h4 class=\"media-heading\">{{ follower.login }}</h4>\n                </div>\n            </div>\n        </div>    \n    ",
                        providers: [github_profile_service_1.GithubProfileService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [github_profile_service_1.GithubProfileService])
                ], GithubProfileComponent);
                return GithubProfileComponent;
            })();
            exports_1("GithubProfileComponent", GithubProfileComponent);
        }
    }
});
//# sourceMappingURL=github-profile.component.js.map