import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AdminLayoutModule} from './layouts/admin-layout/admin-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ComponentsModule} from './components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FinanceModule} from './finance/finance.module';
import {MaterialModule} from './material/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TechniqueModule} from './technique/technique.module';
import {BanqueModule} from './banque/banque.module';
import {SalaireModule} from './salaire/salaire.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from './helper/format-datepicker';
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { ListDepComponent } from './dep/list-dep/list-dep.component';
import { AddDepComponent } from './dep/add-dep/add-dep.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {MatConfirmDialogComponent} from './service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
registerLocaleData(localeFr);




@NgModule({
  declarations: [
    AppComponent,
    AddEmployeComponent,
    ListEmployeComponent,
    ListDepComponent,
    AddDepComponent,
    MatConfirmDialogComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ComponentsModule,
    AdminLayoutModule,
    BrowserAnimationsModule,
    FinanceModule,
    MaterialModule,
    HttpClientModule,
    TechniqueModule,
    BanqueModule,
    SalaireModule,
    NgxIntlTelInputModule,
    Ng2TelInputModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
