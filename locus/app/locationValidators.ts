import {Control, ControlGroup} from 'angular2/common';
import {AppService} from './app.service';

export class LocationValidator {
    static shouldBePresent(cityKey: string, appService: AppService) {
        return (group: ControlGroup): {[key: string]: boolean} => {
            let cityName = group.controls[cityKey];
            var cityValue = cityName.value;
            console.log("In control :"+ cityValue);
            var result = appService.validateCity(cityValue);
            if(result.length == 0) {
                return {
                    shouldBePresent: true
                }; 
            }
            return null;
        }
    }
}