System.register([], function(exports_1) {
    var LocationValidator;
    return {
        setters:[],
        execute: function() {
            LocationValidator = (function () {
                function LocationValidator() {
                }
                LocationValidator.shouldBePresent = function (cityKey, appService) {
                    return function (group) {
                        var cityName = group.controls[cityKey];
                        if (!appService.cityMap.containsKey(cityName.value)) {
                            return {
                                shouldBePresent: true
                            };
                        }
                        return null;
                    };
                };
                return LocationValidator;
            })();
            exports_1("LocationValidator", LocationValidator);
        }
    }
});
//# sourceMappingURL=locationValidators.js.map