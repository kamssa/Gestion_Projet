import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {LocationTravaux} from "../model/LocationTravaux";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Loyer} from "../model/Loyer";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {Autres} from "../model/Autres";


@Injectable({
  providedIn: 'root'
})
export class AutresService {
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

  getAllAutres(): Observable<Resultat<Autres[]>> {
    return this.http.get<Resultat<Autres[]>>(`${environment.apiUrl}/api/autres`);
  }

  ajoutAutres(autres: Autres): Observable<Resultat<Autres>> {
    console.log('methode du service qui ajoute  autres', autres);
    return this.http.post<Resultat<Autres>>(`${environment.apiUrl}/api/autres`, autres);
  }
  modifAutreTravaux(autres: Autres): Observable<Resultat<Autres>> {
    console.log('methode du service qui modifier Autres', Autres);
    return this.http.put<Resultat<Autres>>(`${environment.apiUrl}/api/autres`, autres);
  }
  getAutresById(id: Autres): Observable<Resultat<Autres>> {
    return this.http.get<Resultat<Autres>>(`${environment.apiUrl}/api/autres/${id}`);
  }
  supprimerAutre(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/autres/${id}`);

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetailAutre/${id}/${idDetail}`);

  }
// recuperer achat par id travaux
  getautresByTravaux(id: number): Observable<Autres[]> {
    // @ts-ignore
    return this.http.get<Resultat<Autres[]>>(`${environment.apiUrl}/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<Loyer[]>>('getautresByTravaux'))
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
