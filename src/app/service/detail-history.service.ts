import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {DetailStock} from '../model/DetailStock';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Categorie} from '../model/Categorie';
import {DetailStockHistory} from '../model/DetailStockHistory';

@Injectable({
  providedIn: 'root'
})
export class DetailHistoryService {
// observables sources
  private detailStockHistoryCreerSource = new Subject<Resultat<DetailStockHistory>>();
  private detailStockHistoryModifSource = new Subject<Resultat<DetailStockHistory>>();
  private detailStockHistoryFiltreSource = new Subject<string>();
  private detailStockHistorySupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  detailStockCreer$ = this.detailStockHistoryCreerSource.asObservable();
  detailStockModif$ = this.detailStockHistoryModifSource.asObservable();
  detailStockFiltre$ = this.detailStockHistoryFiltreSource.asObservable();
  detailStockSupprime$ = this.detailStockHistorySupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }



  getAllDetailStockHistory(): Observable<Resultat<DetailStockHistory[]>> {
    return this.http.get<Resultat<DetailStockHistory[]>>(`${environment.apiUrl}/api/detailStockHistory`);
  }

  ajoutDetailStockHistory(cat: DetailStock): Observable<Resultat<DetailStockHistory>> {
    return this.http.post<Resultat<DetailStockHistory>>
    (`${environment.apiUrl}/api/detailStockHistory`, cat)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.detailStockHistoryCreer(res);
        }),
        catchError(this.handleError<Resultat<DetailStockHistory>>('ajoutDetailStock'))
      );;
  }
  modifDetailStock(detailStock: DetailStockHistory): Observable<Resultat<DetailStockHistory>> {
    console.log('methode du service qui modifie un achat', detailStock);
    return this.http.put<Resultat<DetailStockHistory>>(`${environment.apiUrl}/api/detailStockHistory`, detailStock);
  }

  getDetailStockHistoryById(id: DetailStockHistory): Observable<Resultat<DetailStockHistory>> {
    return this.http.get<Resultat<DetailStockHistory>>(`${environment.apiUrl}/api/detailStockHistory/${id}`);
  }
  getDetailStockByLibelle(libelle: string): Observable<Resultat<DetailStockHistory[]>> {
    return this.http.get<Resultat<DetailStockHistory[]>>(`${environment.apiUrl}/api/detailStockHistory/${libelle}`);
  }


  supprimerCategorie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailStockHistory/${id}`)
      .pipe(map(res => res,
        tap(res =>
          this.log(`categorie supp =${res}`))),
        catchError(this.handleError<Resultat<Categorie[]>>('supprimerCategorie'))
      );

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetail/${id}/${idDetail}`);

  }
  detailStockHistoryCreer(res: Resultat<Categorie>) {
    console.log('Categorie a ete  creer correctement essaie source');
    this.detailStockHistoryCreerSource.next(res);
  }

  detailStockStoryModif(res: Resultat<Categorie>) {
    this.detailStockHistoryModifSource.next(res);
  }

  filtreDetailStockHistory(text: string) {
    this.detailStockHistoryFiltreSource.next(text);
  }

  detailStockSupprime(res: Resultat<boolean>) {
    this.detailStockHistorySupprimeSource.next(res);
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
