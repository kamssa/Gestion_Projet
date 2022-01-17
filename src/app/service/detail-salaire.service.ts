import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Employe} from '../model/Employe';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {Loyer} from '../model/Loyer';
import {DetailSalaire} from '../model/DetailSalaire';

@Injectable({
  providedIn: 'root'
})
export class DetailSalaireService {
  private travauxCreerSource = new Subject<Resultat<DetailSalaire>>();
  private travauxModifSource = new Subject<Resultat<DetailSalaire>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();

  // observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDetailSalaire(): Observable<Resultat<DetailSalaire[]>> {
    return this.http.get<Resultat<DetailSalaire[]>>(`${environment.apiUrl}/api/detailSalaire`);
  }

  ajoutDetailSalaire(detailSalaire: DetailSalaire): Observable<Resultat<DetailSalaire>> {
    console.log('methode du service qui ajoute un DetailSalaire', detailSalaire);
    return this.http.post<Resultat<Employe>>(`${environment.apiUrl}/api/detailSalaire`, detailSalaire);
  }
  modifDetailSalaire(detailSalaire: DetailSalaire): Observable<Resultat<DetailSalaire>> {
    console.log('methode du service qui modifier DetailSalaire', detailSalaire);
    return this.http.put<Resultat<DetailSalaire>>(`${environment.apiUrl}/api/detailSalaire`, detailSalaire);
  }
  getDetailSalaireById(id: DetailSalaire): Observable<Resultat<DetailSalaire>> {
    return this.http.get<Resultat<DetailSalaire>>(`${environment.apiUrl}/api/detailSalaire/${id}`);
  }
  supprimerDetailSalaire(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/detailSalaire/${id}`);

  }

  travauxCreer(res: Resultat<Loyer>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<Loyer>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('detailSalaireService: ' + message);

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
