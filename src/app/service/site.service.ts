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
import {Travaux} from '../model/travaux';


@Injectable({
  providedIn: 'root'
})
export class SiteService {
  urlPhoto = 'localhost:8080/';

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getSiteById(id: number): Observable<Resultat<Site>> {
    return this.http.get<Resultat<Site>>(`${environment.apiUrl}/api/site/${id}`);
  }
  ajoutSite(site: Site): Observable<Resultat<Site>> {
    console.log('methode du service qui ajoute un travail', site);
    return this.http.post<Resultat<Site>>(`${environment.apiUrl}/api/site`, site);
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


