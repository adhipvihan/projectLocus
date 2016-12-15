import {Component, Input, OnInit} from 'angular2/core';
import {FoursquareService} from './foursquare.service';
import {AppService} from '../app.service';
import {Location} from '../location';
import {Observable} from "rxjs/Observable";
import {ZippyComponent} from '../zippy.component';
import "rxjs/add/observable/forkJoin"

@Component({
    selector: 'location-popular-places',
    styleUrls: ['app/foursquareComponent/foursquare.component.css'],
    directives: [ZippyComponent],
    templateUrl: 'app/foursquareComponent/foursquare.component.html',
    providers: [FoursquareService]
})
export class FoursquareComponent implements OnInit {
    selectedCity;
    searchByCity;
    mapUrl = "https://www.google.com/maps/place/";

    selectedLocation: Location;
    popularPlaces = [];
    

    // flags
    isExpanded = false;
    isTipsExpanded = [];

    constructor(private _foursquareService : FoursquareService, 
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

                // Call foursquare service
                this._foursquareService.getPopularPlaces(this.selectedLocation)
                    .subscribe(res => {
                            console.log("Recommended places to visit");
                            this.popularPlaces = res.response.groups[0].items;
                            for(var i=0; i < this.popularPlaces.length; i++) {
                                this.isTipsExpanded.push(false);
                            }
                            console.log(this.popularPlaces);
                        }
                    );
                
                
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

                // Call foursquare service
                this._foursquareService.getPopularPlaces(this.selectedLocation)
                    .subscribe(res => {
                            console.log("Recommended places to visit");
                            this.popularPlaces = res.response.groups[0].items;
                            for(var i=0; i < this.popularPlaces.length; i++) {
                                this.isTipsExpanded.push(false);
                            }
                            console.log(this.popularPlaces);
                        }
                    );
            });
        }
        
        
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    toggleTips(i) {
        this.isTipsExpanded[i] = !this.isTipsExpanded[i];
    }

}