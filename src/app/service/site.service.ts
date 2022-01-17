import {Injectable} from '@angular/core';
import {LocationTravaux} from "../model/LocationTravaux";
import {Observable, of} from "rxjs";
import {Resultat} from "../model/resultat";
import {AchatTravaux} from "../model/AchatTravaux";
import {environment} from "../../environments/environment";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {Site} from "../model/site";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "./message.service";


@Injectable({
  providedIn: 'root'
})
export class SiteService {
  urlPhoto = 'localhost:8080/';

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }



  private log(message: string) {
    this.messageService.add('siteService: ' + message);

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}


