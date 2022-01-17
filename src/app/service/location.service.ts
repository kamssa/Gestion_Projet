import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {AchatTravaux} from "../model/AchatTravaux";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {LocationTravaux} from "../model/LocationTravaux";
import {Autres} from "../model/Autres";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // observables sources
  private travauxCreerSource = new Subject<Resultat<LocationTravaux>>();
  private travauxModifSource = new Subject<Resultat<LocationTravaux>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTravaux(): Observable<Resultat<LocationTravaux[]>> {
    return this.http.get<Resultat<LocationTravaux[]>>(`${environment.apiUrl}/api/location`);
  }

  ajoutLocationTravaux(location: LocationTravaux): Observable<Resultat<AchatTravaux>> {
    console.log('methode du service qui ajoute une location', location);
    return this.http.post<Resultat<LocationTravaux>>(`${environment.apiUrl}/api/location`, location);
  }
  modifLocationTravaux(location: LocationTravaux): Observable<Resultat<LocationTravaux>> {
    console.log('methode du service qui modifier location', location);
    return this.http.put<Resultat<LocationTravaux>>(`${environment.apiUrl}/api/location`, location);
  }
  getLocationById(id: Autres): Observable<Resultat<LocationTravaux>> {
    return this.http.get<Resultat<LocationTravaux>>(`${environment.apiUrl}/api/locations/${id}`);
  }
  supprimerLocation(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/location/${id}`);

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetailLocation/${id}/${idDetail}`);

  }
// recuperer location par id travaux
  getLocationByTravaux(id: number): Observable<LocationTravaux[]> {
    // @ts-ignore
    return this.http.get<Resultat<LocationTravaux[]>>(`${environment.apiUrl}/api/location/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<LocationTravaux[]>>('getLocationByTravaux'))
      );
  }

  travauxCreer(res: Resultat<LocationTravaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<LocationTravaux>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('travauxService: ' + message);

  }

  ///////////////////////////////////////////
  // recuper les erreurs


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      console.error(error);


      this.log(`${operation} non disponible: ${error.message}`);


      return of(result as T);
    };
  }
}
