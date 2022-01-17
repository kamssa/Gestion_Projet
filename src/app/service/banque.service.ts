import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Employe} from '../model/Employe';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Loyer} from '../model/Loyer';
import {Banque} from '../model/Banque';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  private travauxCreerSource = new Subject<Resultat<Banque>>();
  private travauxModifSource = new Subject<Resultat<Banque>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllBanque(): Observable<Resultat<Banque[]>> {
    return this.http.get<Resultat<Banque[]>>(`${environment.apiUrl}/api/banque`);
  }

  ajoutBanque(banque: Banque): Observable<Resultat<Banque>> {
    console.log('methode du service qui ajoute une banque', banque);
    return this.http.post<Resultat<Banque>>(`${environment.apiUrl}/api/banque`, banque);
  }
  modifEmploye(banque: Employe): Observable<Resultat<Banque>> {
    console.log('methode du service qui modifier Employe', banque);
    return this.http.put<Resultat<Banque>>(`${environment.apiUrl}/api/banque`, banque);
  }
  getBanqueById(id: Banque): Observable<Resultat<Employe>> {
    return this.http.get<Resultat<Employe>>(`${environment.apiUrl}/api/banque/${id}`);
  }
  supprimerBanque(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/banque/${id}`);

  }

  travauxCreer(res: Resultat<Banque>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<Banque>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('BanqueService: ' + message);

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
