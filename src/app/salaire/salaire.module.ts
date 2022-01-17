import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EnregistrerEmployeComponent} from './enregistrer-employe/enregistrer-employe.component';
import {PayeSalaireComponent} from './paye-salaire/paye-salaire.component';
import {SalaireGesComponent} from './salaire-ges/salaire-ges.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    EnregistrerEmployeComponent,
    PayeSalaireComponent,
    SalaireGesComponent
  ],
  exports: [
    EnregistrerEmployeComponent,
    PayeSalaireComponent,
    SalaireGesComponent
  ]
})
export class SalaireModule { }
