import {Component,Input,Output,ChangeDetectorRef} from 'angular2/core';
import {EventService} from './event.service';
import {OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {AppService} from '../app.service';
import {Location} from '../location';

@Component({
    selector: 'location-events',
    templateUrl: 'app/eventComponent/event.component.html',
    styleUrls: ['app/eventComponent/event.component.css'],
    providers: [EventService]
})
export class EventComponent implements OnInit {

    selectedCity;
    searchByCity;
    selectedLocation: Location;
    @Input() isLoading= true;
    y :any;
    @Input() eventsArray;
    @Input() performersArray;
    errorMessage: any;

    isExpanded = false;

    constructor(private cdRef: ChangeDetectorRef, private _eventService: EventService, private _appService: AppService){

    }

    ngOnInit(){

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

                // Call event service
                // this._eventService.getPopularEvents(this.selectedLocation)
                //     .subscribe(res => {
                //         console.log(res);
                //         this.eventsArray = res.search.events.event;
                //     })


               this._eventService.getEvents(this.selectedLocation.zipCode);
                    this.y = this._eventService.notifyParent
                        .subscribe(item => {
                            this.eventsArray = item.events.event;
                            console.log(this.eventsArray);
                            this.isLoading = false;
                            this.cdRef.detectChanges();
                            console.log(this.isLoading);
                        },
                        error=> {
                            this.errorMessage = <any> error
                            console.log("error: ", this.errorMessage);
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

                // Call event service
            //    this._eventService.getPopularEvents(this.selectedLocation)
            //         .subscribe(res => {
            //             console.log(res);
            //             this.eventsArray = res.search.events.event;
            //         })

               
                this._eventService.getEvents(this.selectedLocation.zipCode);
                    this.y = this._eventService.notifyParent
                        .subscribe(item => {
                            this.eventsArray = item.events.event;
                            console.log(this.eventsArray);
                            this.isLoading = false;
                            this.cdRef.detectChanges();
                            console.log(this.isLoading);
                        },
                        error=> {
                            this.errorMessage = <any> error
                            console.log("error: ", this.errorMessage);
                        });  
            });
        }

    }

    dateFormatter(data){

    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}