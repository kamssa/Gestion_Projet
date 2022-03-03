import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Caisse} from '../model/Caisse';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {CaisseDetail} from '../model/CaisseDetail';

@Injectable({
  providedIn: 'root'
})
export class CaisseDetailService {


  constructor(private  http: HttpClient, private messageService: MessageService) {
  }


  getCaisseDetailByEntrepriseId(id: number): Observable<Resultat<CaisseDetail[]>> {
    return this.http.get<Resultat<CaisseDetail[]>>(`${environment.apiUrl}/api/getCaisseDetailByIdEntreprise/${id}`);
  }


}
