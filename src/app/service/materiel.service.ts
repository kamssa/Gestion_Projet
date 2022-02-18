import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Categorie} from '../model/Categorie';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Materiaux} from '../model/Materiaux';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
// observables sources
  private materielCreerSource = new Subject<Resultat<Materiaux>>();
  private materielModifSource = new Subject<Resultat<Materiaux>>();
  private materielFiltreSource = new Subject<string>();
  private materielSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  materielCreer$ = this.materielCreerSource.asObservable();
  materielModif$ = this.materielModifSource.asObservable();
  materielFiltre$ = this.materielFiltreSource.asObservable();
  materielSupprime$ = this.materielSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    libelle: new FormControl('',[Validators.required] ),
    description: new FormControl(''),
    unite: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      libelle: '',
      description: '',
      unite: '',
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllMateriel(): Observable<Resultat<Materiaux[]>> {
    return this.http.get<Resultat<Materiaux[]>>(`${environment.apiUrl}/api/materiel`);
  }

  ajoutMateriel(materiel: Materiaux): Observable<Resultat<Materiaux>> {
    console.log('methode du service qui ajoute un achat', materiel);
    return this.http.post<Resultat<Materiaux>>
    (`${environment.apiUrl}/api/materiel`, materiel)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.materielCreer(res);
        }),
        catchError(this.handleError<Resultat<Materiaux>>('ajoutMateriel'))
      );
  }
  modifMateriel(materiel: Materiaux): Observable<Resultat<Materiaux>> {
    console.log('methode du service qui modifie un achat', materiel);
    return this.http.put<Resultat<Materiaux>>(`${environment.apiUrl}/api/materiel`, materiel)
      .pipe(
      tap(res => {
        this.log(`categorie modifié =${res.body}`);
        this.materielModif(res);
      }),
      catchError(this.handleError<Resultat<Materiaux>>('modifMateriel'))
    );
  }

  getMaterielById(id: number): Observable<Resultat<Materiaux>> {
    return this.http.get<Resultat<Materiaux>>(`${environment.apiUrl}/api/materiel/${id}`);
  }
  getMatByIdCategorie(id: number): Observable<Resultat<Materiaux[]>> {
    return this.http.get<Resultat<Materiaux[]>>(`${environment.apiUrl}/api/getMaterielByidCategorie/${id}`);
  }

  supprimerMateriel(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/materiel/${id}`)
      .pipe(map(res => res,
        tap(res =>
          this.log(`categorie supp =${res}`))),
        catchError(this.handleError<Resultat<Materiaux[]>>('supprimerMateriel'))
      );

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetail/${id}/${idDetail}`);

  }
  materielCreer(res: Resultat<Materiaux>) {
    console.log('Materiel a été  creé correctement essaie source');
    this.materielCreerSource.next(res);
  }

  materielModif(res: Resultat<Materiaux>) {
    this.materielModifSource.next(res);
  }

  filtreMateriel(text: string) {
    this.materielFiltreSource.next(text);
  }

  materielSupprime(res: Resultat<boolean>) {
    this.materielSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('MaterielService: ' + message);

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
