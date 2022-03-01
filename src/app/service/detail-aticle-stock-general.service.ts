import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {DetailAticleStockGeneral} from '../model/DetailAticleStockGeneral';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DetailAticleStockGeneralService {
// observables sources
  private detailAticleStockGeneralCreerSource = new Subject<Resultat<DetailAticleStockGeneral>>();
  private detailAticleStockGeneralModifSource = new Subject<Resultat<DetailAticleStockGeneral>>();
  private detailAticleStockGeneralFiltreSource = new Subject<string>();
  private detailAticleStockGeneralSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  detailAticleStockGeneralCreer$ = this.detailAticleStockGeneralCreerSource.asObservable();
  detailAticleStockGeneralModif$ = this.detailAticleStockGeneralModifSource.asObservable();
  detailAticleStockGeneralFiltre$ = this.detailAticleStockGeneralFiltreSource.asObservable();
  detailAticleStockGeneralSupprime$ = this.detailAticleStockGeneralSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }



  getAllDetailAticleStockGeneral(): Observable<Resultat<DetailAticleStockGeneral[]>> {
    return this.http.get<Resultat<DetailAticleStockGeneral[]>>(`${environment.apiUrl}/api/detailAticleStockGeneral`);
  }

  ajoutDetailAticleStockGeneral(cat: DetailAticleStockGeneral): Observable<Resultat<DetailAticleStockGeneral>> {
    return this.http.post<Resultat<DetailAticleStockGeneral>>
    (`${environment.apiUrl}/api/detailAticleStockGeneral`, cat)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.detailStockCreer(res);
        }),
        catchError(this.handleError<Resultat<DetailAticleStockGeneral>>('ajoutDetailStock'))
      );;
  }
  modifDetailAticleStockGeneral(detailStock: DetailAticleStockGeneral): Observable<Resultat<DetailAticleStockGeneral>> {
    console.log('methode du service qui modifie un achat', detailStock);
    return this.http.put<Resultat<DetailAticleStockGeneral>>(`${environment.apiUrl}/api/detailAticleStockGeneral`, detailStock);
  }

  getDetailAticleStockGeneralById(id: number): Observable<Resultat<DetailAticleStockGeneral>> {
    return this.http.get<Resultat<DetailAticleStockGeneral>>(`${environment.apiUrl}/api/detailAticleStockGeneral/${id}`);
  }
  getDetailAticleStockGeneralByIdEntreprise(id: number): Observable<Resultat<DetailAticleStockGeneral[]>> {
    return this.http.get<Resultat<DetailAticleStockGeneral[]>>(`${environment.apiUrl}/api/getStockGenralByidEntreprise/${id}`);
  }

  supprimerDetailAticleStockGeneral(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailAticleStockGeneral/${id}`)
      .pipe(map(res => res,
        tap(res =>
          this.log(`DetailAticleStockGeneral supp =${res}`))),
        catchError(this.handleError<Resultat<DetailAticleStockGeneral[]>>('supprimerCategorie'))
      );

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailAticleStockGeneral/${id}/${idDetail}`);

  }
  detailStockCreer(res: Resultat<DetailAticleStockGeneral>) {
    console.log('Categorie a ete  creer correctement essaie source');
    this.detailAticleStockGeneralCreerSource.next(res);
  }

  detailStockModif(res: Resultat<DetailAticleStockGeneral>) {
    this.detailAticleStockGeneralModifSource.next(res);
  }

  filtreDetailStock(text: string) {
    this.detailAticleStockGeneralFiltreSource.next(text);
  }

  detailStockSupprime(res: Resultat<boolean>) {
    this.detailAticleStockGeneralSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('CategorieService: ' + message);

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
