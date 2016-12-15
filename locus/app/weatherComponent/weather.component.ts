import {Component, Input, OnInit} from 'angular2/core';
import {WeatherService} from './weather.service';
import {AppService} from '../app.service';
import {Location} from '../location';
import {Observable} from "rxjs/Observable";
import {ZippyComponent} from '../zippy.component';
import "rxjs/add/observable/forkJoin"

@Component({
    selector: 'location-weather',
    styleUrls: ['app/weatherComponent/weather.component.css'],
    directives: [ZippyComponent],
    templateUrl: 'app/weatherComponent/weather.component.html',
    providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
    selectedCity;
    searchByCity;
    
    selectedLocation: Location;
    weatherResponse: {};
    today;
    forecast = [];
    numDaysForecast = 3; // Can not be greater than 9.

    // flags
    isExpanded = false;
    isMainExpanded = true;

    constructor(private _weatherService : WeatherService, 
        private _appService: AppService) {
        
    }

    ngOnInit() {
        if(this.searchByCity) {
            // Search by city name
            this._appService.validateCity(this.selectedCity)
            .subscribe(res => {
                if(res.length == 0) {
                    return;
                }
                this.selectedLocation = new Location(
                    res[0].zipCode,
                    res[0].stateCode,
                    res[0].cityName,
                    res[0].stateName,
                    res[0].lattitude,
                    res[0].longitude,
                    res[0].cityKey
                );


                Observable.forkJoin(this._weatherService.getWeather(this.selectedLocation),
                        this._weatherService.getWeatherForecast(this.selectedLocation))
                    .subscribe(res => {
                        this.weatherResponse = res[0];
                        console.log(res[0]);
                        this.today = res[0].current_observation.local_time_rfc822.substring(5,16);
                        console.log("Forecast is");
                        console.log(res[1]);
                        this.forecast = res[1].forecast.simpleforecast.forecastday.splice(1, 1 + this.numDaysForecast);
                        console.log(this.forecast);
                    },
                    null,
                    () => {
                        console.log("Weather request is completed..");
                    });
            });
        } else {
            // Search by zip code

            this._appService.validateZipCode(this.selectedCity)
            .subscribe(res => {
                if(res.length == 0) {
                    return;
                }
                this.selectedLocation = new Location(
                    res[0].zipCode,
                    res[0].stateCode,
                    res[0].cityName,
                    res[0].stateName,
                    res[0].lattitude,
                    res[0].longitude,
                    res[0].cityKey
                );


                Observable.forkJoin(this._weatherService.getWeather(this.selectedLocation),
                        this._weatherService.getWeatherForecast(this.selectedLocation))
                    .subscribe(res => {
                        this.weatherResponse = res[0];
                        console.log(res[0]);
                        this.today = res[0].current_observation.local_time_rfc822.substring(5,16);
                        console.log("Forecast is");
                        console.log(res[1]);
                        this.forecast = res[1].forecast.simpleforecast.forecastday.splice(1, 1 + this.numDaysForecast);
                        console.log(this.forecast);
                    },
                    null,
                    () => {
                        console.log("Weather request is completed..");
                    });
            });
        }
        
        
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    toggleMain() {
        this.isMainExpanded = !this.isMainExpanded;
    }

    getFormattedDate(d: Date) {
        var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear();
        return datestring;
 
    }


}