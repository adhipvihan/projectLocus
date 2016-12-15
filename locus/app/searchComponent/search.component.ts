import {Component, Input} from 'angular2/core';
import {ControlGroup, Control, Validators, FormBuilder} from 'angular2/common';
import {SearchService} from './search.service';
import {AppService} from '../app.service';
import {WeatherComponent} from '../weatherComponent/weather.component';
import {YelpComponent} from '../yelpComponent/yelp.component';
import {EventComponent} from '../eventComponent/event.component';
import {DclWrapper} from '../dclwrapper.component';

@Component({
    selector: 'search-location',
    templateUrl: 'app/searchComponent/search.component.html',
    styles:[
        `
            .reg_name {
                max-width:200px;
            }
        `
    ],
    providers: [SearchService],
    directives: [WeatherComponent, YelpComponent, EventComponent, DclWrapper]
})
export class SearchComponent {
    
    // Placeholders
    currentPlaceHolder = "Search by city name..."; 
    cityPlaceHolder = "Search by city name...";
    zipcodePlaceHolder = "Search by zip code..."

    form: ControlGroup;
    
    //Components
    weatherComponent: {};
    yelpComponent: {};
    eventComponent: {};
    foursquareComponent: {};

    // Flags
    isSearch = false;
    isLoading = false;
    isNotPresent = false;
    isError = false;
    searchByCity = true

    private _cityName : string;
    
    constructor(fb: FormBuilder, private _searchService: SearchService, private _appService: AppService) {
        this.form = fb.group({
            city: ['', Validators.compose([Validators.required])]

        });
    }

    radioClick(event) {

        var clicked = event.target.id;
        if(clicked == "searchCity"){
            this.searchByCity = true;
            this.currentPlaceHolder = this.cityPlaceHolder;
            $("#city").val('');
            var datalist = $("#locationDataList");
            datalist.empty();
            
            
        } else if(clicked == "searchZipcode") {
            this.searchByCity = false;
            this.currentPlaceHolder = this.zipcodePlaceHolder;
            $("#city").val('');
            var datalist = $("#locationDataList");
            datalist.empty();

        }
    }

    search() {
        if (!this.form.value) {
            return;
        }

        this._cityName = this.form.value.city;
        console.log("Search is :" + this.searchByCity);
        if(this.searchByCity) {
            // Search by cit name
            this._appService.validateCity(this._cityName)
                .subscribe(res => {
                
                    console.log(res.length);
                    if(res.length == 0) {
                        this.isNotPresent = true;
                    } else {
                        // Only if city is present at the backend, launch all components.
                        this.isNotPresent = false;
                        var componentList = this._searchService.startSearch(this._cityName, this.searchByCity);
                        this.weatherComponent = componentList[0];
                        this.yelpComponent = componentList[1];
                        this.eventComponent = componentList[2];
                        this.foursquareComponent = componentList[3];
                
                        this.isSearch = true;                
                    }

                });
        } else {

            // Search by zipcode
            this._appService.validateZipCode(this._cityName)
                .subscribe(res => {
                
                    console.log(res.length);
                    if(res.length == 0) {
                        this.isNotPresent = true;
                    } else {
                        // Only if zipcode is present at the backend, launch all components.
                        this.isNotPresent = false;
                        var componentList = this._searchService.startSearch(this._cityName, this.searchByCity);
                        this.weatherComponent = componentList[0];
                        this.yelpComponent = componentList[1];
                        this.eventComponent = componentList[2];
                        this.foursquareComponent = componentList[3];
               
                        this.isSearch = true;                
                    }

                });
        }
             
    }

    debouncedSearch = _.debounce(function(event) {
            var locationPrefix = event.target.value;
            console.log("value is " + locationPrefix);
            if(locationPrefix.length < 3) {
                return;
            }
            if(locationPrefix.indexOf(',') != -1) {
                return;
            }
            if(!this.searchByCity && locationPrefix.length >=5) {
                return;
            }
            this.isLoading = true;
            this.isNotPresent = false;
            this.isError = false;
            if(this.searchByCity) {
                this._searchService.getLocationList(locationPrefix)
                .subscribe(res => {
                    var datalist = $("#locationDataList");
                    datalist.empty();
                    for(var i = 0; i < res.length; i++) {
                        var opt = $("<option></option").attr("value", res[i]);
                        datalist.append(opt);
                    }
                }, error => {
                    this.isLoading = false;
                    this.isError = true;
                    console.log(error);
                }, complete => {
                    this.isLoading = false;
                });
            } else {
                this._searchService.getZipCodeList(locationPrefix)
                .subscribe(res => {
                    var datalist = $("#locationDataList");
                    datalist.empty();
                    console.log(res);
                    for(var i = 0; i < res.length; i++) {
                        var opt = $("<option></option").attr("value", res[i]);
                        datalist.append(opt);
                    }
                }, error => {
                    this.isLoading = false;
                    this.isError = true;
                    console.log(error);
                }, complete => {
                    this.isLoading = false;
                });
            }
            
        }, 500);




}