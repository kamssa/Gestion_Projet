import { Injectable } from '@angular/core';
import {Departement} from '../model/Departement';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Resultat} from '../model/resultat';
import {environment} from '../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepService {

  // observables sources
  departements: Departement[];

  constructor(private  http: HttpClient, private messageService: MessageService) {
  }

  getAllDepartement(): Observable<Resultat<Departement[]>> {
    return this.http.get<Resultat<Departement[]>>(`${environment.apiUrl}/api/departement`);
  }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    version: new FormControl(null),
    libelle: new FormControl('',[Validators.required] ),
    description: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      version: null,
      libelle: '',
      description: ''
    });
  }
  ajoutDepartement(departement: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui ajoute  categorie', departement);
    return this.http.post<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, departement);
  }
  modifDepartement(departement: Departement): Observable<Resultat<Departement>> {
    console.log('methode du service qui modifier departement', departement);
    return this.http.put<Resultat<Departement>>(`${environment.apiUrl}/api/departement`, departement);
  }
  getDepartementById(id: number): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/departement/${id}`);
  }
  getDepartementByNom(libelle: string): Observable<Resultat<Departement>> {
    return this.http.get<Resultat<Departement>>(`${environment.apiUrl}/api/getdocumentByLibelle/${libelle}`);
  }
  supprimerDepartement(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/departement/${id}`);

  }

  populateForm(id) {
    this.form.patchValue(id);
  }
}
