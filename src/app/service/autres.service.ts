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
import {AchatTravaux} from '../model/AchatTravaux';
import {DetailLocation} from '../model/DetailLocation';
import {DetailAutres} from '../model/DetailAutres';


@Injectable({
  providedIn: 'root'
})
export class AutresService {
// observables sources
  private autreCreerSource = new Subject<Resultat<Autres>>();
  private autrModifSource = new Subject<Resultat<Autres>>();
  private autreFiltreSource = new Subject<string>();
  private autreSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  autrCreer$ = this.autreCreerSource.asObservable();
  autrModif$ = this.autrModifSource.asObservable();
  autrFiltre$ = this.autreFiltreSource.asObservable();
  autrSupprime$ = this.autreSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllAutres(): Observable<Resultat<Autres[]>> {
    return this.http.get<Resultat<Autres[]>>(`${environment.apiUrl}/api/autres`);
  }

  ajoutAutres(autres: Autres): Observable<Resultat<Autres>> {
    console.log('methode du service qui ajoute  autres', autres);
    return this.http.post<Resultat<Autres>>
    (`${environment.apiUrl}/api/autres`, autres)
      .pipe(
        tap(res => {
          this.log(`achat crée =${res.body}`);
          this.autreCreer(res);
        }),
        catchError(this.handleError<Resultat<AchatTravaux>>('ajoutAutres'))
      );
  }
  modifAutreTravaux(autres: Autres): Observable<Resultat<Autres>> {
    console.log('methode du service qui modifier Autres', Autres);
    return this.http.put<Resultat<Autres>>(`${environment.apiUrl}/api/autres`, autres);
  }
  getAutresById(id: Autres): Observable<Resultat<Autres>> {
    return this.http.get<Resultat<Autres>>(`${environment.apiUrl}/api/autre/${id}`);
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
    return this.http.get<Resultat<Autres[]>>(`${environment.apiUrl}/api/autres/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`location trouve =${res}`))),
        catchError(this.handleError<Resultat<Loyer[]>>('getautresByTravaux'))
      );
  }
// recuperer achat par id travaux
  getDetailAutreByTravaux(id: number): Observable<DetailAutres[]> {
    // @ts-ignore
    return this.http.get<Resultat<DetailAutres[]>>(`${environment.apiUrl}/api/detailAutre/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Resultat<DetailAutres[]>>('getAchatTravauxByTravaux'))
      );
  }
  autreCreer(res: Resultat<Autres>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.autreCreerSource.next(res);
  }

  autreModif(res: Resultat<Autres>) {
    this.autrModifSource.next(res);
  }

  filtreautre(text: string) {
    this.autreFiltreSource.next(text);
  }

  autresupprime(res: Resultat<boolean>) {
    this.autreSupprimeSource.next(res);
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
