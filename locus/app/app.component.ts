/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {SearchComponent} from './searchComponent/search.component';
import {AppService} from './app.service';

@Component({
    selector: 'my-app',
    template: `
        <search-location></search-location>
    `,
    directives: [SearchComponent]
})
export class AppComponent {
    
    constructor(private _appService: AppService) {
        
    }
}