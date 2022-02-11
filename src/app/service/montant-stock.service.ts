import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {MontantStock} from '../model/MontantStock';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MontantStockService {

  // observables sources
  private categorieCreerSource = new Subject<Resultat<MontantStock>>();
  private categorieModifSource = new Subject<Resultat<MontantStock>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  categorieCreer$ = this.categorieCreerSource.asObservable();
  categorieModif$ = this.categorieModifSource.asObservable();
  categorieFiltre$ = this.categorieFiltreSource.asObservable();
  categorieSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getMontantStockByIdEntreprise(id: number): Observable<Resultat<MontantStock>> {
    return this.http.get<Resultat<MontantStock>>(`${environment.apiUrl}/api/getMontantStockByidEntreprise/${id}`);
  }


  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetail/${id}/${idDetail}`);

  }
  montantStockCreer(res: Resultat<MontantStock>) {
    console.log('Categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  montantStockModif(res: Resultat<MontantStock>) {
    this.categorieModifSource.next(res);
  }

  filtreMontantStock(text: string) {
    this.categorieFiltreSource.next(text);
  }

  montantStockSupprime(res: Resultat<boolean>) {
    this.categorieSupprimeSource.next(res);
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
