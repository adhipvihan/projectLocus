import {Component, OnInit} from "angular2/core";
import {GithubProfileService} from "./github-profile.service";
import {HTTP_PROVIDERS} from "angular2/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin"

@Component({
    selector: 'github-profile',
    styles: [`
        .avatar {
            width: 100;
            height: 100;
            border-radios: 100%;
        }
    `],
    template: `
        <i *ngIf="isLoading" class="fa fa-spinner fa-spin fa-3x"></i>
        <div *ngIf="isLoading == false">
            <h2>@{{ user.login }}</h2>
            <a href="{{ user.html_url }}" target="_blank">
                <img class= "avatar" src= "{{ user.avatar_url }}" />
            </a>
            <h3>Followers</h3>
            
            <div *ngFor="#follower of followers" class="media">
                <div class="media-left">
                    <a href="{{ follower.html_url }}" target="_blank">
                        <img class="media-object avatar" src="{{ follower.avatar_url }}" />
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading">{{ follower.login }}</h4>
                </div>
            </div>
        </div>    
    `,
    providers: [GithubProfileService, HTTP_PROVIDERS]
})
export class GithubProfileComponent implements OnInit {
    isLoading = true;
    user = {};
    followers = [];
    private _username = "gaylemcd";
    constructor(private _gitHubProfileService : GithubProfileService) {

    }

    ngOnInit() {
        Observable.forkJoin(
            this._gitHubProfileService.getUser(this._username),
            this._gitHubProfileService.getFollowers(this._username)
        ).subscribe(
            res => {
                console.log("Got both results");
                this.user= res[0],
                this.followers = res[1]
            },
            null,
            () => { 
                console.log("It is completed!!!!");
                this.isLoading = false;
                console.log("is loading is "+this.isLoading);
            }
        )
    }
}