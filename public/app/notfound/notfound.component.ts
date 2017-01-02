import { ChatService } from '../services/chat-service';
import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService, FacebookLoginResponse, FacebookInitParams } from '../../node_modules/ng2-facebook-sdk/dist/ng2-facebook-sdk.js';
import { User } from '../models/user-model'
import { UserService } from '../services/user-service';
import { CondominiumService } from '../services/condominium-service'
import { ApartmentService } from '../services/apartment-service'
import { ProtocolService } from '../services/protocol-service'
import {ManagerUnionService} from '../services/managerUnion-service'
import { AuthenticationService } from '../services/authentication-service';
import { AlertService} from '../services/alert-service';
import {ControlUnionService} from '../services/controlUnion-service'

declare var $: JQueryStatic;

@Component({
    selector: 'notfound',
    templateUrl: 'app/notfound/notfound.component.html',
    styleUrls: ['css/style.css']
})

export class NotFoundComponent {
    constructor() {
            
    }

}