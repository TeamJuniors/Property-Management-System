import {Component} from '@angular/core'

@Component({
    selector: 'app',
    templateUrl: 'app/home/home.component.html' 
})
export class HomeComponent{
    
    isLogged: boolean = false;
    username: string;

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
            this.username = JSON.parse(localStorage.getItem('currentUser')).username;
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
