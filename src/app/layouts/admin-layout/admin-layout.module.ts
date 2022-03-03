import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {AdminLayoutComponent} from './admin-layout.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ComponentsModule} from '../../components/components.module';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {MaterialModule} from '../../material/material.module';
import {AddEmployeComponent} from '../../employe/add-employe/add-employe.component';
import {ListEmployeComponent} from '../../employe/list-employe/list-employe.component';
import {ListDepComponent} from '../../dep/list-dep/list-dep.component';
import {AddDepComponent} from '../../dep/add-dep/add-dep.component';
import {MatConfirmDialogComponent} from '../../service/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import {AddStockComponent} from '../../stock/add-stock/add-stock.component';
import {ListStockComponent} from '../../stock/list-stock/list-stock.component';
import {AddMaterielComponent} from '../../materiel/add-materiel/add-materiel.component';
import {ListMaterielComponent} from '../../materiel/list-materiel/list-materiel.component';
import {AddCategorieComponent} from '../../categorie/add-categorie/add-categorie.component';
import {ListCategorieComponent} from '../../categorie/list-categorie/list-categorie.component';
import {ListCaisseComponent} from '../../caisse/list-caisse/list-caisse.component';
import {AddCaisseComponent} from '../../caisse/add-caisse/add-caisse.component';
import {CaisseComponent} from '../../caisse/caisse.component';
import {RetraitCaisseComponent} from '../../caisse/retrait-caisse/retrait-caisse.component';
import {VersementCaisseComponent} from '../../caisse/versement-caisse/versement-caisse.component';
import {OperationCaisseComponent} from '../../caisse/operation-caisse/operation-caisse.component';
import {EditOperationCaisseComponent} from '../../caisse/edit-operation-caisse/edit-operation-caisse.component';
import {AdministrationComponent} from '../../administration/administration.component';
import {StockComponent} from '../../stock/stock.component';
import {EditStockComponent} from '../../stock/edit-stock/edit-stock.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import {Ng2TelInputModule} from 'ng2-tel-input';
import {FinanceModule} from '../../finance/finance.module';
import {DetailHistoryComponent} from '../../stock/detail-history/detail-history.component';
import {ComptabiliteComponent} from '../../comptabilite/comptabilite/comptabilite.component';
import {EmployePermitionComponent} from '../../employe/employe-permition/employe-permition.component';
import {UpdateProjetComponent} from '../../finance/siteTravaux/update-projet/update-projet.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    UserProfileComponent,
    AddEmployeComponent,
    ListEmployeComponent,
    ListDepComponent,
    AddDepComponent,
    MatConfirmDialogComponent,
    AddStockComponent,
    ListStockComponent,
    AddMaterielComponent,
    ListMaterielComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    ListCaisseComponent,
    AddCaisseComponent,
    CaisseComponent,
    RetraitCaisseComponent,
    VersementCaisseComponent,
    OperationCaisseComponent,
    EditOperationCaisseComponent,
    AdministrationComponent,
    StockComponent,
    EditStockComponent,
    DetailHistoryComponent,
    ComptabiliteComponent,
    EmployePermitionComponent,

  ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        ComponentsModule,
        MaterialModule,
        NgxIntlTelInputModule,
        Ng2TelInputModule,
        FinanceModule
    ]
})
export class AdminLayoutModule { }
