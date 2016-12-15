import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {Http, HTTP_PROVIDERS} from 'angular2/http'; 
import {AppService} from './app.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, AppService]);