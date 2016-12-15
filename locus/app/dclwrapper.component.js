System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DclWrapper;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DclWrapper = (function () {
                function DclWrapper(dcl) {
                    this.dcl = dcl;
                    this.isViewInitialized = false;
                    console.log("In dcl constructor");
                }
                DclWrapper.prototype.updateComponent = function () {
                    var _this = this;
                    // should be executed every time `type` changes but not before `ngAfterViewInit()` was called 
                    // to have `target` initialized
                    if (!this.isViewInitialized) {
                        return;
                    }
                    if (this.cmpRef) {
                        this.cmpRef.dispose();
                    }
                    this.dcl.loadNextToLocation(this.type, this.target).then(function (cmpRef) {
                        _this.cmpRef = cmpRef;
                        _this.cmpRef.instance.selectedCity = _this.selectedCity;
                        _this.cmpRef.instance.searchByCity = _this.searchByCity;
                    });
                };
                DclWrapper.prototype.ngOnChanges = function () {
                    this.updateComponent();
                };
                DclWrapper.prototype.ngAfterViewInit = function () {
                    this.isViewInitialized = true;
                    this.updateComponent();
                };
                DclWrapper.prototype.ngOnDestroy = function () {
                    if (this.cmpRef) {
                        this.cmpRef.dispose();
                    }
                };
                __decorate([
                    core_1.ViewChild('target'), 
                    __metadata('design:type', Object)
                ], DclWrapper.prototype, "target", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DclWrapper.prototype, "type", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DclWrapper.prototype, "selectedCity", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DclWrapper.prototype, "searchByCity", void 0);
                DclWrapper = __decorate([
                    core_1.Component({
                        selector: 'dcl-wrapper',
                        template: "<div #target></div>"
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader])
                ], DclWrapper);
                return DclWrapper;
            })();
            exports_1("DclWrapper", DclWrapper);
        }
    }
});
//# sourceMappingURL=dclwrapper.component.js.map