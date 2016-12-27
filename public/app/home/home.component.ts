import {Component} from '@angular/core'
import {User} from '../_models/user'
declare var $:JQueryStatic;

@Component({
    selector: 'app',
    templateUrl: 'app/home/home.component.html' 
})
export class HomeComponent{
    
    isLogged: boolean = false;
    username: string;
    user: User;

    constructor(){
        console.log("Constructor");
        if(localStorage.getItem('currentUser') != undefined){
            console.log("True")
            this.isLogged = true;
        }else{
            this.isLogged = false;
        }
        console.log(localStorage.getItem('currentUser'));
    }

    ngOnInit(){
        console.log("OnInit");
        if(localStorage.getItem('currentUser')){
            this.isLogged = true;
            this.user = JSON.parse(localStorage.getItem('currentUser'));
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
            var activeEl = 0;
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
            $('#profile-image1').on('click', function() {
                  console.log('Cliked');
                  $('#profile-image-upload').click();
            });
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

    logout(){
        console.log("Test");
        localStorage.removeItem('currentUser');
        this.isLogged = false;
    }
}
