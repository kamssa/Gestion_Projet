import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {DetailStock} from '../model/DetailStock';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Categorie} from '../model/Categorie';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailStockService {
// observables sources
  private detailStockCreerSource = new Subject<Resultat<DetailStock>>();
  private detailStockModifSource = new Subject<Resultat<DetailStock>>();
  private detailStockFiltreSource = new Subject<string>();
  private detailStockSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  detailStockCreer$ = this.detailStockCreerSource.asObservable();
  detailStockModif$ = this.detailStockModifSource.asObservable();
  detailStockFiltre$ = this.detailStockFiltreSource.asObservable();
  detailStockSupprime$ = this.detailStockSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }



  getAllDetailStock(): Observable<Resultat<DetailStock[]>> {
    return this.http.get<Resultat<DetailStock[]>>(`${environment.apiUrl}/api/detailStock`);
  }

  ajoutDetailStock(cat: DetailStock): Observable<Resultat<DetailStock>> {
    return this.http.post<Resultat<DetailStock>>
    (`${environment.apiUrl}/api/detailStock`, cat)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.detailStockCreer(res);
        }),
        catchError(this.handleError<Resultat<DetailStock>>('ajoutDetailStock'))
      );;
  }
  modifDetailStock(detailStock: DetailStock): Observable<Resultat<DetailStock>> {
    console.log('methode du service qui modifie un achat', detailStock);
    return this.http.put<Resultat<DetailStock>>(`${environment.apiUrl}/api/detailStock`, detailStock);
  }

  getDetailStockById(id: number): Observable<Resultat<DetailStock>> {
    return this.http.get<Resultat<DetailStock>>(`${environment.apiUrl}/api/detailStock/${id}`);
  }
  getCatByIdEntreprise(id: number): Observable<Resultat<Categorie[]>> {
    return this.http.get<Resultat<Categorie[]>>(`${environment.apiUrl}/api/getCategorieByidEntreprise/${id}`);
  }

  supprimerCategorie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/categorie/${id}`)
      .pipe(map(res => res,
        tap(res =>
          this.log(`categorie supp =${res}`))),
        catchError(this.handleError<Resultat<Categorie[]>>('supprimerCategorie'))
      );

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetail/${id}/${idDetail}`);

  }
  detailStockCreer(res: Resultat<Categorie>) {
    console.log('Categorie a ete  creer correctement essaie source');
    this.detailStockCreerSource.next(res);
  }

  detailStockModif(res: Resultat<Categorie>) {
    this.detailStockCreerSource.next(res);
  }

  filtreDetailStock(text: string) {
    this.detailStockFiltreSource.next(text);
  }

  detailStockSupprime(res: Resultat<boolean>) {
    this.detailStockSupprimeSource.next(res);
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
