import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Employe} from '../model/Employe';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private employeCreerSource = new Subject<Resultat<Employe>>();
  private employeModifSource = new Subject<Resultat<Employe>>();
  private employeFiltreSource = new Subject<string>();
  private employeSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  employeCreer$ = this.employeCreerSource.asObservable();
  employeModif$ = this.employeModifSource.asObservable();
  employeFiltre$ = this.employeFiltreSource.asObservable();
  employeSupprime$ = this.employeSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    fonction: new FormControl(''),
    activated: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      name: '',
      username: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      password: '',
      fonction: '',
      activated: '',

    });
  }
  populateForm(id) {
    this.form.patchValue(id);
  }
  getAllClient(): Observable<Resultat<Employe[]>> {
    return this.http.get<Resultat<Employe[]>>(`${environment.apiUrl}/api/auth/client`);
  }
  registraction(personne: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un client', personne);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/auth/signuc/`, personne);
  }
  ajoutClient(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui ajoute un client', employe);
    return this.http.post<Resultat<Employe>>
    (`${environment.apiUrl}/api/employe`,
      client).pipe(
      tap(res => {
        this.log(`Client crée =${res.body}`);
        this.employeCreer(res);
      }),
      catchError(this.handleError<Resultat<Employe>>('ajoutClient'))
    );
  }
  modifClient(employe: Employe): Observable<Resultat<Employe>> {
    console.log('methode du service qui modifie un client', employe);
    return this.http.put<Resultat<Employe>>
    (`${environment.apiUrl}/api/employe`,
      client).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.employeModif(res);
      }),
      catchError(this.handleError<Resultat<Employe>>('modifClient'))
    );
  }
  getClientById(id: number): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/employe/${id}`);
  }
  deleteClientById(id: number): Observable<Resultat<Employe>> {
    return this.http.delete<Resultat<Employe>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  getClientByEmail(email: string): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/auth/getClient/${email}`);
  }
  rechercheClientParMc(mc: string): Observable<Array<Employe>> {
    return this.http.get<Resultat<Array<Employe>>>(`${environment.apiUrl}/api/auth/clientbyMc/${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`client trouve =${res}`))),
        catchError(this.handleError<Array<Employe>>('rechercheClientParMc'))
      );

  }

  employeCreer(res: Resultat<Employe>) {
    console.log('Client a ete  creer correctement essaie source');
    this.employeCreerSource.next(res);
  }
  employeModif(res: Resultat<Employe>) {
    this.employeModifSource.next(res);
  }

  filtreEmploye(text: string) {
    this.employeFiltreSource.next(text);
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
