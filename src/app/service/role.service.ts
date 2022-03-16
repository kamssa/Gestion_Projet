import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../model/resultat';
import {Departement} from '../model/Departement';
import {environment} from '../../environments/environment';
import {Stock} from '../model/Stock';
import {Role} from '../model/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }
  getAllRole(): Observable<Resultat<Role[]>> {
    return this.http.get<Resultat<Role[]>>(`${environment.apiUrl}/api/role`);
  }
  getRoleById(id: number): Observable<Resultat<Role>> {
    return this.http.get<Resultat<Role>>(`${environment.apiUrl}/api/role/${id}`);
  }
}
