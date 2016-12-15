import * as Collections from 'typescript-collections';

export class Location {
    
    constructor(
        public zipCode: string, 
        public stateCode: string, 
        public cityName: string, 
        public stateName: string, 
        public lattidue: string,
        public longitude: string,
        public cityKey: string) {
    }

    toString() {
        return Collections.util.makeString(this);
    }
}