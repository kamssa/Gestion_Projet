import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {LocationTravaux} from "../model/LocationTravaux";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Loyer} from "../model/Loyer";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoyService {
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

  getAllLoyer(): Observable<Resultat<Loyer[]>> {
    return this.http.get<Resultat<Loyer[]>>(`${environment.apiUrl}/api/loyer`);
  }

  ajoutLoyer(loyer: Loyer): Observable<Resultat<Loyer>> {
    console.log('methode du service qui ajoute un loyer', loyer);
    return this.http.post<Resultat<Loyer>>(`${environment.apiUrl}/api/loyer`, loyer);
  }
  modifLoyerTravaux(location: Loyer): Observable<Resultat<Loyer>> {
    console.log('methode du service qui modifier Loyer', location);
    return this.http.put<Resultat<Loyer>>(`${environment.apiUrl}/api/loyer`, location);
  }
  getLoyerById(id: Loyer): Observable<Resultat<Loyer>> {
    return this.http.get<Resultat<Loyer>>(`${environment.apiUrl}/api/loye/${id}`);
  }
  supprimerLoyer(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/loyer/${id}`);

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetailLoyer/${id}/${idDetail}`);

  }
// recuperer achat par id travaux
  getLoyerByTravaux(id: number): Observable<Loyer[]> {
    // @ts-ignore
    return this.http.get<Resultat<Loyer[]>>(`${environment.apiUrl}/api/loyer//${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<Loyer[]>>('getLocationByTravaux'))
      );
  }

  travauxCreer(res: Resultat<Loyer>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<Loyer>) {
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
