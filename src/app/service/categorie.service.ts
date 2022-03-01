import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Categorie} from '../model/Categorie';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Materiaux} from '../model/Materiaux';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
// observables sources
  private categorieCreerSource = new Subject<Resultat<Categorie>>();
  private categorieModifSource = new Subject<Resultat<Categorie>>();
  private categorieFiltreSource = new Subject<string>();
  private categorieSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  categorieCreer$ = this.categorieCreerSource.asObservable();
  categorieModif$ = this.categorieModifSource.asObservable();
  categorieFiltre$ = this.categorieFiltreSource.asObservable();
  categorieSupprime$ = this.categorieSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    libelle: new FormControl('',[Validators.required] ),
    description: new FormControl(''),
    idEntreprise: new FormControl('')
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      libelle: '',
      description: '',
      idEntreprise: ''
    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllCategorie(): Observable<Resultat<Categorie[]>> {
    return this.http.get<Resultat<Categorie[]>>(`${environment.apiUrl}/api/categorie`);
  }

  ajoutCategorie(cat: Categorie): Observable<Resultat<Categorie>> {
    return this.http.post<Resultat<Categorie>>
    (`${environment.apiUrl}/api/categorie`, cat)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.categorieCreer(res);
        }),
        catchError(this.handleError<Resultat<Categorie>>('ajoutCategorie'))
      );
  }
  modifCategorie(cat: Categorie): Observable<Resultat<Categorie>> {
    console.log('methode du service qui modifie un achat', cat);
    return this.http.put<Resultat<Categorie>>
    (`${environment.apiUrl}/api/categorie`, cat)
      .pipe(
        tap(res => {
          this.log(`categorie crée =${res.body}`);
          this.categorieModif(res);
        }),
        catchError(this.handleError<Resultat<Categorie>>('modifCategorie'))
      );
  }

  getCategorieById(id: Categorie): Observable<Resultat<Categorie>> {
    return this.http.get<Resultat<Categorie>>(`${environment.apiUrl}/api/categorie/${id}`);
  }
  getCatByIdEntreprise(id: number): Observable<Resultat<Categorie[]>> {
    return this.http.get<Resultat<Categorie[]>>(`${environment.apiUrl}/api/getCategorieByidEntreprise/${id}`);
  }
  getMatByIdEntreprise(id: number): Observable<Resultat<Materiaux[]>> {
    return this.http.get<Resultat<Materiaux[]>>(`${environment.apiUrl}/api/listMatParEntreprise/${id}`);
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
  categorieCreer(res: Resultat<Categorie>) {
    console.log('Categorie a ete  creer correctement essaie source');
    this.categorieCreerSource.next(res);
  }

  categorieModif(res: Resultat<Categorie>) {
    this.categorieModifSource.next(res);
  }

  filtreCategorie(text: string) {
    this.categorieFiltreSource.next(text);
  }

  categorieSupprime(res: Resultat<boolean>) {
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
