import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Personne} from '../model/Personne';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminCreerSource = new Subject<Resultat<Personne>>();
  private adminModifSource = new Subject<Resultat<Personne>>();
  private adminFiltreSource = new Subject<string>();
  private adminSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  adminCreer$ = this.adminCreerSource.asObservable();
  adminModif$ = this.adminModifSource.asObservable();
  adminFiltre$ = this.adminFiltreSource.asObservable();
  adminSupprime$ = this.adminSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getAdminById(id: Personne): Observable<Resultat<Personne>> {
    return this.http.get<Resultat<Personne>>(`${environment.apiUrl}/api/admin/${id}`);
  }

  adminCreer(res: Resultat<Personne>) {
    console.log('Employe a ete  creer correctement essaie source');
    this.adminCreerSource.next(res);
  }

  adminModif(res: Resultat<Personne>) {
    this.adminModifSource.next(res);
  }

  filtreAdmin(text: string) {
    this.adminFiltreSource.next(text);
  }
  private log(message: string) {
    this.messageService.add('EmployeService: ' + message);

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
