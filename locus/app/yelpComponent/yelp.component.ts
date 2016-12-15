import {Component, Input, OnInit} from 'angular2/core';
import {YelpService} from './yelp.service';
import {AppService} from '../app.service';
import {Location} from '../location';

@Component({
    selector: 'location-restaurants',
    templateUrl: 'app/yelpComponent/yelp.component.html',
    styleUrls:['app/yelpComponent/yelp.component.css'],
    providers: [YelpService]
})
export class YelpComponent implements OnInit {
    selectedCity;
    searchByCity;
    selectedLocation: Location;
    restaurants = [];
    mapUrl = "https://www.google.com/maps/place/";

    isExpanded = true;
    
    constructor(private _yelpService : YelpService, 
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

                this._yelpService.getRestaurants(this.selectedLocation)
                    .subscribe(res => {
                        console.log(res.toString());
                        this.restaurants = res.businesses;
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

                this._yelpService.getRestaurants(this.selectedLocation)
                    .subscribe(res => {
                        console.log(res);
                        this.restaurants = res.businesses;
                    });
            });
        }
        
        
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}