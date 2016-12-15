//import {Http,Jsonp,Headers,RequestOptions} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Location} from '../location';
import {Component,Input,Output,EventEmitter} from 'angular2/core';


@Injectable()
export class EventService {
  jsonData: any;
  notifyParent = new EventEmitter();
  private _serverUrl = "http://localhost:4000";

  constructor(private _http : Http) {
      
  } 

  getEvents(location) { 
      var m = this;
      var oArgs = {
          app_key: "DHcfQdPRdK3H43Kt",
          //q: "music",
          where: location,
          //page_size: 5,
          sort_order: "popularity",
      };

      EVDB.API.call("/events/search", oArgs,function(oData) {
            
              var x = oData.events.event;

            for(var i = 0; i < x.length; i++) {
                x[i].start_time = x[i].start_time.slice(0,11);
              }
              for(var i = 0; i < x.length; i++) {
                if(x[i].performers == null)
                    continue;

                else if(x[i].performers.performer.length>=0){
                  var performerBackup = x[i].performers.performer;
                  x[i].performers = new Array();
                    
                    for(var j=0;j<performerBackup.length;j++){
                        x[i].performers.push(performerBackup[j].name);
                    }
                }
                else{
                  var performerBackup = x[i].performers.performer;
                  x[i].performers = new Array();
                  x[i].performers.push(performerBackup.name);
                }
              }

              console.log(x);
            m.jsonData = oData;
            m.notifyParent.emit(oData);
          }
        );
  }

  getPopularEvents(location : Location) {
        var finalUrl = this._serverUrl + "/api/events/findEvents?zipCode=" + location.zipCode;

        console.log("Eventful hitting url : " + finalUrl);
        return this._http.get(finalUrl)
            .map(res => res.json());
    }

}