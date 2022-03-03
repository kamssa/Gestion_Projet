import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Caisse} from '../model/Caisse';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  private caisseCreerSource = new Subject<Resultat<Caisse>>();
  private caisseModifSource = new Subject<Resultat<Caisse>>();
  private caisseFiltreSource = new Subject<string>();
  private caisseSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  caisseCreer$ = this.caisseCreerSource.asObservable();
  caisseModif$ = this.caisseModifSource.asObservable();
  caisseFiltre$ = this.caisseFiltreSource.asObservable();
  caisseSupprime$ = this.caisseSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllCaisse(): Observable<Resultat<Caisse[]>> {
    return this.http.get<Resultat<Caisse[]>>(`${environment.apiUrl}/api/caisse`);
  }

  ajoutCaisse(client: Caisse): Observable<Resultat<Caisse>> {
    console.log('methode du service qui ajoute un client', client);
    return this.http.post<Resultat<Caisse>>
    (`${environment.apiUrl}/api/caisse`,
      client).pipe(
      tap(res => {
        this.log(`Caisse crée =${res.body}`);
        this.caisseCreer(res);
      }),
      catchError(this.handleError<Resultat<Caisse>>('ajoutCaisse'))
    );
  }
  modifClient(client: Caisse): Observable<Resultat<Caisse>> {
    console.log('methode du service qui modifie un client', client);
    return this.http.put<Resultat<Caisse>>
    (`${environment.apiUrl}/api/auth/client`,
      client).pipe(
      tap(res => {
        this.log(`Client modifié =${res.body}`);
        this.caisseModif(res);
      }),
      catchError(this.handleError<Resultat<Caisse>>('modifClient'))
    );
  }
  getCaisseById(id: number): Observable<Resultat<Caisse>> {
    return this.http.get<Resultat<Caisse>>(`${environment.apiUrl}/api/caisse/${id}`);
  }
  deleteCaisseById(id: number): Observable<Resultat<Caisse>> {
    return this.http.delete<Resultat<Caisse>>(`${environment.apiUrl}/api/auth/client/${id}`);
  }
  getCaisseByEmail(email: string): Observable<Resultat<Caisse>> {
    return this.http.get<Resultat<Caisse>>(`${environment.apiUrl}/api/auth/getClient/${email}`);
  }
  rechercheCaisseParMc(mc: string): Observable<Array<Caisse>> {
    return this.http.get<Resultat<Array<Caisse>>>(`${environment.apiUrl}/api/auth/clientbyMc/${mc}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`client trouve =${res}`))),
        catchError(this.handleError<Array<Caisse>>('rechercheClientParMc'))
      );

  }

  caisseCreer(res: Resultat<Caisse>) {
    console.log('Client a ete  creer correctement essaie source');
    this.caisseCreerSource.next(res);
  }

  caisseModif(res: Resultat<Caisse>) {
    this.caisseModifSource.next(res);
  }

  filtreCaisse(text: string) {
    this.caisseFiltreSource.next(text);
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
