import {User} from '../models/user-model'
import {Apartment} from '../models/apartment-model'

export class Condominium{
    manager: User;
    apartments:  Apartment[];
    floatNumber: String;
    entrance: String;
    city: String;
    neighborhood: String;
}