import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {BanqueComponent} from './banque.component';
import {ListOperationComponent} from './list-operation/list-operation.component';
import {EditOperationComponent} from './edit-operation/edit-operation.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RetraitComponent } from './retrait/retrait.component';
import { VersementComponent } from './versement/versement.component';
import { AddBanqueComponent } from './add-banque/add-banque.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  BanqueComponent,
    ListOperationComponent,
    EditOperationComponent,
    RetraitComponent,
    VersementComponent,
    AddBanqueComponent
  ],
  exports: [
    BanqueComponent,
    BanqueComponent,
    ListOperationComponent,
    EditOperationComponent,
    RetraitComponent
  ]
})
export class BanqueModule { }
