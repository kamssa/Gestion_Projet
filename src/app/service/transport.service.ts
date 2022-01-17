import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {Resultat} from "../model/resultat";
import {LocationTravaux} from "../model/LocationTravaux";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Loyer} from "../model/Loyer";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {Transport} from "../model/Transport";


@Injectable({
  providedIn: 'root'
})
export class TransportService {
// observables sources
  private travauxCreerSource = new Subject<Resultat<Transport>>();
  private travauxModifSource = new Subject<Resultat<Transport>>();
  private travauxFiltreSource = new Subject<string>();
  private travauxSupprimeSource = new Subject<Resultat<boolean>>();


// observables streams
  travauxCreer$ = this.travauxCreerSource.asObservable();
  travauxModif$ = this.travauxModifSource.asObservable();
  travauxFiltre$ = this.travauxFiltreSource.asObservable();
  travauxSupprime$ = this.travauxSupprimeSource.asObservable();

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllTransport(): Observable<Resultat<Transport[]>> {
    return this.http.get<Resultat<Transport[]>>(`${environment.apiUrl}/api/transport`);
  }

  ajoutTransport(transport: Transport): Observable<Resultat<Transport>> {
    console.log('methode du service qui ajoute un Transport', transport);
    return this.http.post<Resultat<Transport>>(`${environment.apiUrl}/api/transport`, transport);
  }
  modifTransportTravaux(transport: Transport): Observable<Resultat<Transport>> {
    console.log('methode du service qui modifier transport', transport);
    return this.http.put<Resultat<Loyer>>(`${environment.apiUrl}/api/transport`, transport);
  }
  getTransportById(id: Transport): Observable<Resultat<Transport>> {
    return this.http.get<Resultat<Transport>>(`${environment.apiUrl}/api/transports/${id}`);
  }
  supprimerTransport(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/transport/${id}`);

  }
  supprimerDetail(id: number, idDetail: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/DeleteDetailTransport/${id}/${idDetail}`);

  }
// recuperer achat par id travaux
  getTransportByTravaux(id: number): Observable<Transport[]> {
    // @ts-ignore
    return this.http.get<Resultat<Transport[]>>(`${environment.apiUrl}/api/transport/${id}`)
      .pipe(map(res => res.body,
        tap(res =>
          this.log(`transport trouvés =${res}`))),
        catchError(this.handleError<Resultat<Transport[]>>('getTransportByTravaux'))
      );
  }

  travauxCreer(res: Resultat<LocationTravaux>) {
    console.log('Travail a ete  creer correctement essaie source');
    this.travauxCreerSource.next(res);
  }

  abonnesModif(res: Resultat<LocationTravaux>) {
    this.travauxModifSource.next(res);
  }

  filtreTravaux(text: string) {
    this.travauxFiltreSource.next(text);
  }

  travauxsupprime(res: Resultat<boolean>) {
    this.travauxSupprimeSource.next(res);
  }

  private log(message: string) {
    this.messageService.add('travauxService: ' + message);

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
