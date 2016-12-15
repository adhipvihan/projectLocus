System.register(['typescript-collections'], function(exports_1) {
    var Collections;
    var Location;
    return {
        setters:[
            function (Collections_1) {
                Collections = Collections_1;
            }],
        execute: function() {
            Location = (function () {
                function Location(zipCode, stateCode, cityName, stateName, lattidue, longitude) {
                    this.zipCode = zipCode;
                    this.stateCode = stateCode;
                    this.cityName = cityName;
                    this.stateName = stateName;
                    this.lattidue = lattidue;
                    this.longitude = longitude;
                }
                Location.prototype.toString = function () {
                    return Collections.util.makeString(this);
                };
                return Location;
            })();
            exports_1("Location", Location);
        }
    }
});
//# sourceMappingURL=location.js.map