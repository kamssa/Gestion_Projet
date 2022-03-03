import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {Travaux} from "../model/travaux";
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {catchError, map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {MessageService} from "./message.service";
import {AchatTravaux} from "../model/AchatTravaux";
import {Photo} from "../model/Photo";
import {Categorie} from '../model/Categorie';

@Injectable({
  providedIn: 'root'
})
export class SteTravauxService {
  urlPhoto = 'http://localhost:8080/api/travauxPhoto';
  // observables sources
  private travauxCreerSource = new Subject<Resultat<Travaux>>();
  private travauxModifSource = new Subject<Resultat<Travaux>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTravaux(): Observable<Resultat<Travaux[]>> {
    return this.http.get<Resultat<Travaux[]>>(`${environment.apiUrl}/api/travaux`);
  }

  ajoutTravaux(travaux: Travaux): Observable<Resultat<Travaux>> {
    console.log('methode du service qui ajoute un travail', travaux);
    return this.http.post<Resultat<Travaux>>(`${environment.apiUrl}/api/travaux`, travaux);
  }

  modifierTravaux(travauxModif: Travaux): Observable<Resultat<Travaux>> {
    return this.http.put<Resultat<Travaux>>(`${environment.apiUrl}/api/travaux`,
      travauxModif)
      .pipe(
        tap(res => {
          this.log(`travaux modifier =${res.body}`);
          this.travauxModif(res);
        }),
        catchError(this.handleError<Resultat<Travaux>>('modifierTravaux'))
      );;
  }
  getTravauxById(id: number): Observable<Resultat<Travaux>> {
    return this.http.get<Resultat<Travaux>>(`${environment.apiUrl}/api/travaux/${id}`);
  }
  getTravauxByIdSite(id: number): Observable<Resultat<Travaux[]>> {
    return this.http.get<Resultat<Travaux[]>>(`${environment.apiUrl}/api/travauxByIdSite/${id}`);
  }

  rechercheTravauxParMc(mc: string): Observable<Array<Travaux>> {
    return this.http.get<Resultat<Array<Travaux>>>(`${environment.apiUrl}/api/rechemc/?mc=${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Array<Travaux>>('rechercheTravauxParMc'))
      );

  }
  // supprimer un travail
  supprimerTravaux(id: number): Observable<Resultat<boolean>> {
    return this.http.delete<Resultat<boolean>> (`${environment.apiUrl}/api/travaux/${id}`);
  }
  getPhotoByIdTravaux(id: number): Observable<Resultat<Photo[]>> {
    return this.http.get<Resultat<Photo[]>>(`${environment.apiUrl}/api/getPhoto/${id}`);
  }

  upload(formData, id): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/upload/?id=${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  travauxCreer(res: Resultat<Travaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  travauxModif(res: Resultat<Travaux>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }
  travauxsupprime(res: Resultat<boolean>){
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
