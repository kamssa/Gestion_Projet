import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Departement} from '../model/Departement';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, tap} from 'rxjs/operators';
import {Stock} from '../model/Stock';
import {DetailStock} from '../model/DetailStock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockCreerSource = new Subject<Resultat<Stock>>();
  private stockModifSource = new Subject<Resultat<Stock>>();
  private stockFiltreSource = new Subject<string>();
  private stockSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  stockCreer$ = this.stockCreerSource.asObservable();
  stockModif$ = this.stockModifSource.asObservable();
  stockFiltre$ = this.stockFiltreSource.asObservable();
  stockSupprime$ = this.stockSupprimeSource.asObservable();
  // observables sources
  departements: Departement[];

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDepartement(): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/departement`);
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    quantite: new FormControl('',[Validators.required] ),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      quantite: '',
    });
  }

  ajoutStock(stock: Stock): Observable<Resultat<Stock>> {
    console.log('methode du service qui ajoute  stock', stock);
    return this.http.post<Resultat<Stock>>(`${environment.apiUrl}/api/stock`,
      stock)
      .pipe(
        tap(res => {
          this.log(`stock ajoute =${res.body}`);
          this.stockCreer(res);
        }),
        catchError(this.handleError<Resultat<Stock>>('ajoutStock'))
      );
  }
  modifStock(stock: Stock): Observable<Resultat<Stock>> {
    console.log('methode du service qui modifier stock', stock);
    return this.http.put<Resultat<Stock>>(`${environment.apiUrl}/api/stock`,
      stock)
      .pipe(
        tap(res => {
          this.log(`stock modifié =${res.body}`);
          this.stockModif(res);
        }),
        catchError(this.handleError<Resultat<Stock>>('modifStock'))
      );
  }
  getStockByIdEntreprise(id: number): Observable<Resultat<Stock[]>> {
    return this.http.get<Resultat<Stock[]>>(`${environment.apiUrl}/api/getStockByidEntreprise/${id}`);
  }
  getStockentreByIdEntreprise(id: number): Observable<Resultat<Stock[]>> {
    return this.http.get<Resultat<Stock[]>>(`${environment.apiUrl}/api/listStockParEntreprise/${id}`);
  }
  getStockById(id: number): Observable<Resultat<Stock>> {
    return this.http.get<Resultat<Stock>>(`${environment.apiUrl}/api/stock/${id}`);
  }
  getStockByLibelle(libelle: string): Observable<Resultat<Stock>> {
    return this.http.get<Resultat<Stock>>(`${environment.apiUrl}/api/stock/${libelle}`);
  }

  supprimerStock(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/stock/${id}`);

  }

  populateForm(id) {
    this.form.patchValue(id);
  }
  stockCreer(res: Resultat<Stock>) {
    console.log('Client a ete  creer correctement essaie source');
    this.stockCreerSource.next(res);
  }

  stockModif(res: Resultat<Stock>) {
    this.stockCreerSource.next(res);
  }

  filtreDep(text: string) {
    this.stockFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('clientService: ' + message);

  }
  ///////////////////////////////////////////
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
