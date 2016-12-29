import {Component} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import {FacebookService, FacebookLoginResponse, FacebookInitParams} from '../../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js';
import {User} from '../models/user-model'
import { UserService } from '../services/user-service';

declare var $:JQueryStatic;

@Component({
    selector: 'app',
    templateUrl: 'app/home/home.component.html',
    styles: [`
        .pointer-mouse {
            cursor: pointer;
        }
    `]
})

export class HomeComponent{
    isLogged: boolean = false;
    username: string;
    user: User;
    newImgUrl: string;

    constructor(private userService: UserService, 
                private fb: FacebookService,
                private route: ActivatedRoute,
                private router: Router){
        if(localStorage.getItem('currentUser') != undefined){
            this.isLogged = true;
        }else{
            this.isLogged = false;
        }
        console.log(localStorage.getItem('currentUser'));

        let fbParams: FacebookInitParams = {
                                   appId: '1064731376969661',
                                   xfbml: true,
                                   version: 'v2.6'
                                   };
        this.fb.init(fbParams);

        this.newImgUrl = '';
    }

    ngOnInit(){
        console.log("OnInit");
        if(localStorage.getItem('currentUser')){
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.username = this.user.username;
            var activeEl = 0;
            //Setting defalt image
            this.user.imgUrl = this.user.imgUrl || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg';

            $(function() {
                var items = $('.btn-nav');
                $( items[activeEl] ).addClass('active');
                $( ".btn-nav" ).click(function() {
                    $( items[activeEl] ).removeClass('active');
                    $( this ).addClass('active');
                    activeEl = $( ".btn-nav" ).index( this );
                });
            });
            console.log("LOADED");
        }else{
            this.isLogged = false;
        }
    }

    ngOnChange(){
        console.log("OnChange");
        if(localStorage.getItem('currentUser')){
            this.isLogged = true;
        }else{
            this.isLogged = false;
        }
    }

    uploadImageClick() {
        this.userService.changeImage(this.user, this.newImgUrl)
            .subscribe(
            (newUser: User) => {
                    console.log('Upload Image')
                    console.log(newUser)
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    this.user.imgUrl = newUser.imgUrl;
                    this.newImgUrl = '';
                },
                error => {
                    console.log("Upload error");
                    console.log(error);
                    //this.alertService.error(error);
                    //this.loading = false;
                });
    }

    logout(){
        console.log("Test");
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    }

    facebookLoginClick(): void {
        this.fb.login().then(
            (response: FacebookLoginResponse) => {
                console.log("Facebook response");
                console.log(response)

                if(response.status === 'connected') {
                    localStorage.setItem('facebookAuthToken', response.authResponse.userID);
                    this.router.navigateByUrl('/login/facebook')
                }
            },
            (error: any) => {
            }
        );
    }
}
