import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Travaux} from '../model/travaux';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateEvolutionService {

  constructor(private  http: HttpClient, private messageService: MessageService) {

  }

  getEvolution(id: number): Observable<Resultat<Travaux>> {
    return this.http.get<Resultat<Travaux>>(`${environment.apiUrl}/api/evolution/${id}`);
  }
}
