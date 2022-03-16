import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FinanceComponent} from './finance.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DetailSiteTravauxComponent} from './siteTravaux/detail-site-travaux/detail-site-travaux.component';
import {ListeSiteTravauxOperationComponent} from './siteTravaux/liste-site-travaux-operation/liste-site-travaux-operation.component';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MaterialModule} from '../material/material.module';
import {MatMenuModule} from '@angular/material/menu';
import {EditSiteTravauxComponent} from './siteTravaux/edit-site-travaux/edit-site-travaux.component';
import {ConnexionComponent} from '../connexion/connexion.component';
import {EditPaieLoyerComponent} from './operationsTravaux/loyer/edit-paie-loyer/edit-paie-loyer.component';
import {EditLocationTravauxComponent} from './operationsTravaux/location/edit-detail/edit-location-travaux.component';
import {EditMainouvreTravauxComponent} from './operationsTravaux/mainouvre/edit-mainouvre-travaux/edit-mainouvre-travaux.component';
import {EditTranspTravauxComponent} from './operationsTravaux/transport/edit-detail/edit-transp-travaux.component';
import {EditAutredepenseTravauxComponent} from './operationsTravaux/autres/edit-detail/edit-autredepense-travaux.component';
import {ListAchatComponent} from './operationsTravaux/achat/list-achat/list-achat.component';
import {EditAchatComponent} from './operationsTravaux/achat/edit-achat/edit-achat.component';
import {SuccessDialogComponent} from '../service/shared/dialogs/success-dialog/success-dialog.component';
import {ErrorDialogComponent} from '../service/shared/dialogs/error-dialog/error-dialog.component';
import {EditLocationComponent} from './operationsTravaux/location/edit-location/edit-location.component';
import {ListLocationComponent} from './operationsTravaux/location/list-location/list-location.component';
import {EditAutreDepenseComponent} from './operationsTravaux/autres/edit-autre-depense/edit-autre-depense.component';
import {ListMainDoeuvreComponent} from './operationsTravaux/mainouvre/list-main-doeuvre/list-main-doeuvre.component';
import {ListAutreDepenseComponent} from './operationsTravaux/autres/list-autre-depense/list-autre-depense.component';
import {EditMainDoeuvreComponent} from './operationsTravaux/mainouvre/edit-main-doeuvre/edit-main-doeuvre.component';
import {ListTransportComponent} from './operationsTravaux/transport/list-transport/list-transport.component';
import {EditTransportComponent} from './operationsTravaux/transport/edit-transport/edit-transport.component';
import {DatailAchatDialogComponent} from './operationsTravaux/achat/dialogue/datail-achat-dialog/datail-achat-dialog.component';
import {DialogLocationComponent} from './operationsTravaux/location/dialog-location/dialog-location.component';
import {DialogTransportComponent} from './operationsTravaux/transport/dialog-transport/dialog-transport.component';
import {DialogMainouvreComponent} from './operationsTravaux/mainouvre/dialog-mainouvre/dialog-mainouvre.component';
import {DialogLoyerComponent} from './operationsTravaux/loyer/dialog-loyer/dialog-loyer.component';
import {DialogAutresComponent} from './operationsTravaux/autres/dialog-autres/dialog-autres.component';
import {ListLoyerComponent} from './operationsTravaux/loyer/list-loyer/list-loyer.component';
import {DetailLoyerComponent} from './operationsTravaux/loyer/detail-loyer/detail-loyer.component';
import {EditAchatTravauxComponent} from './operationsTravaux/achat/edit-achat-travaux/edit-achat-travaux.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AutreAchatTravauxComponent } from './operationsTravaux/autreAchatTravaux/autre-achat-travaux/autre-achat-travaux.component';
import {UpdateProjetComponent} from './siteTravaux/update-projet/update-projet.component';
import { AddTravauxSiteComponent } from './siteTravaux/add-travaux-site/add-travaux-site.component';
import { ListAutreAchatComponent } from './operationsTravaux/autreAchatTravaux/list-autre-achat/list-autre-achat.component';
import { DialogAutreAchatTravauxComponent } from './operationsTravaux/autreAchatTravaux/dialog-autre-achat-travaux/dialog-autre-achat-travaux.component';
import { EditAutreAchatTravauxComponent } from './operationsTravaux/autreAchatTravaux/edit-autre-achat-travaux/edit-autre-achat-travaux.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatChipsModule,
        MaterialModule,
        MatMenuModule,
        FlexLayoutModule
    ],
  declarations: [
    FinanceComponent,
    DetailSiteTravauxComponent,
    ListeSiteTravauxOperationComponent,
    EditSiteTravauxComponent,
    ConnexionComponent,
    EditPaieLoyerComponent,
    EditLocationTravauxComponent,
    EditMainouvreTravauxComponent,
    EditTranspTravauxComponent,
    EditAutredepenseTravauxComponent,
    ListeSiteTravauxOperationComponent,
    DetailSiteTravauxComponent,
    EditSiteTravauxComponent,
    ListAchatComponent,
    ListeSiteTravauxOperationComponent,
    EditAchatComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    EditLocationComponent,
    ListLocationComponent,
    EditAutreDepenseComponent,
    ListAutreDepenseComponent,
    ListMainDoeuvreComponent,
    EditMainDoeuvreComponent,
    ListTransportComponent,
    EditTransportComponent,
    DatailAchatDialogComponent,
    DialogLocationComponent,
    DialogTransportComponent,
    DialogMainouvreComponent,
    DialogLoyerComponent,
    DialogAutresComponent,
    ListLoyerComponent,
    DetailLoyerComponent,
    ConnexionComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    EditAchatTravauxComponent,
    AutreAchatTravauxComponent,
    UpdateProjetComponent,
    AddTravauxSiteComponent,
    ListAutreAchatComponent,
    DialogAutreAchatTravauxComponent,
    EditAutreAchatTravauxComponent


  ],
    exports: [
        FinanceComponent,
        DetailSiteTravauxComponent,
        ListeSiteTravauxOperationComponent,
        EditSiteTravauxComponent,
        ConnexionComponent,
        EditPaieLoyerComponent,
        EditLocationTravauxComponent,
        EditMainouvreTravauxComponent,
        EditTranspTravauxComponent,
        EditAutredepenseTravauxComponent,
        ListeSiteTravauxOperationComponent,
        DetailSiteTravauxComponent,
        EditSiteTravauxComponent,
        ListAchatComponent,
        ListeSiteTravauxOperationComponent,
        EditAchatComponent,
        SuccessDialogComponent,
        ErrorDialogComponent,
        EditLocationComponent,
        ListLocationComponent,
        EditAutreDepenseComponent,
        ListAutreDepenseComponent,
        ListMainDoeuvreComponent,
        EditMainDoeuvreComponent,
        ListTransportComponent,
        EditTransportComponent,
        DatailAchatDialogComponent,
        DialogLocationComponent,
        DialogTransportComponent,
        DialogMainouvreComponent,
        DialogLoyerComponent,
        DialogAutresComponent,
        ListLoyerComponent,
        DetailLoyerComponent,
        ConnexionComponent,
        SuccessDialogComponent,
        ErrorDialogComponent,
        EditAchatTravauxComponent,
        AutreAchatTravauxComponent
    ]
})
export class FinanceModule { }
