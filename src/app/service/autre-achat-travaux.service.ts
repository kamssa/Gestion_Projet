import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {AutreAchatTravaux} from '../model/AutreAchatTravaux';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {AchatTravaux} from '../model/AchatTravaux';
import {DetailAutreAchatTravaux} from '../model/DetailAutreAchatTravaux';

@Injectable({
  providedIn: 'root'
})
export class AutreAchatTravauxService {

  // observables sources
  private travauxCreerSource = new Subject<Resultat<AutreAchatTravaux>>();
  private travauxModifSource = new Subject<Resultat<AutreAchatTravaux>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllAutreAchatTravaux(): Observable<Resultat<AutreAchatTravaux[]>> {
    return this.http.get<Resultat<AutreAchatTravaux[]>>(`${environment.apiUrl}/api/autreAchatTravaux`);
  }

  ajoutAutreAchatTravaux(achatTravaux: AutreAchatTravaux): Observable<Resultat<AutreAchatTravaux>> {
    console.log('methode du service qui ajoute un achat', achatTravaux);
    return this.http.post<Resultat<AutreAchatTravaux>>
    (`${environment.apiUrl}/api/autreAchatTravaux`, achatTravaux)
      .pipe(
        tap(res => {
          this.log(`achat crée =${res.body}`);
          this.travauxCreer(res);
        }),
        catchError(this.handleError<Resultat<AutreAchatTravaux>>('ajoutAchatTravaux'))
      );
  }
  modifAchatTravaux(achatTravaux: AutreAchatTravaux): Observable<Resultat<AutreAchatTravaux>> {
    console.log('methode du service qui modifie un achat', achatTravaux);
    return this.http.put<Resultat<AutreAchatTravaux>>(`${environment.apiUrl}/api/autreAchatTravaux`, achatTravaux);
  }

  getAutreAchatTravauxById(id: AutreAchatTravaux): Observable<Resultat<AutreAchatTravaux>> {
    return this.http.get<Resultat<AutreAchatTravaux>>(`${environment.apiUrl}/api/autreAchatTravaux/${id}`);
  }

// recuperer achat par id travaux
  getAutreAchatTravauxByTravaux(id: number): Observable<AutreAchatTravaux[]> {
    // @ts-ignore
    return this.http.get<Resultat<AutreAchatTravaux[]>>(`${environment.apiUrl}/api/autreAchat/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Resultat<AutreAchatTravaux[]>>('getAchatTravauxByTravaux'))
      );
  }
  supprimerUnAchat(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/autreAchatTravaux/${id}`)
      .pipe(map(res => res,
        tap(res =>
          this.log(`travaux supp =${res}`))),
        catchError(this.handleError<Resultat<AutreAchatTravaux[]>>('supprimerUnAchat'))
      );

  }
  // recuperer achat par id travaux
  getDetailAutreAchatByTravaux(id: number): Observable<DetailAutreAchatTravaux[]> {
    // @ts-ignore
    return this.http.get<Resultat<DetailAutreAchatTravaux[]>>(`${environment.apiUrl}/api/detailAutreAchatTravaux/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`travaux trouve =${res}`))),
        catchError(this.handleError<Resultat<DetailAutreAchatTravaux[]>>('getAchatTravauxByTravaux'))
      );
  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/autreAchatTravaux/${id}/${idDetail}`);

  }
  travauxCreer(res: Resultat<AutreAchatTravaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<AutreAchatTravaux>) {
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
