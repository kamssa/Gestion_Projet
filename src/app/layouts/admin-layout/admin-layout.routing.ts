import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {FinanceComponent} from '../../finance/finance.component';
import {ListeSiteTravauxOperationComponent} from '../../finance/siteTravaux/liste-site-travaux-operation/liste-site-travaux-operation.component';
import {EditAchatComponent} from '../../finance/operationsTravaux/achat/edit-achat/edit-achat.component';
import {EditLocationComponent} from '../../finance/operationsTravaux/location/edit-location/edit-location.component';
import {EditPaieLoyerComponent} from '../../finance/operationsTravaux/loyer/edit-paie-loyer/edit-paie-loyer.component';
import {EditMainDoeuvreComponent} from '../../finance/operationsTravaux/mainouvre/edit-main-doeuvre/edit-main-doeuvre.component';
import {EditTransportComponent} from '../../finance/operationsTravaux/transport/edit-transport/edit-transport.component';
import {EditAutreDepenseComponent} from '../../finance/operationsTravaux/autres/edit-autre-depense/edit-autre-depense.component';
import {EditSiteTravauxComponent} from '../../finance/siteTravaux/edit-site-travaux/edit-site-travaux.component';
import {TechniqueComponent} from '../../technique/technique.component';
import {EditTecniqueComponent} from '../../technique/edit-tecnique/edit-tecnique.component';
import {AddImageComponent} from '../../technique/add-image/add-image.component';
import {BanqueComponent} from '../../banque/banque.component';
import {SalaireGesComponent} from '../../salaire/salaire-ges/salaire-ges.component';
import {RetraitComponent} from '../../banque/retrait/retrait.component';


export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile',   component: UserProfileComponent },
  {  path : 'finance',
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuardService],
        component: FinanceComponent,
        children: [
          {
            path: 'detail/:id',
            component: ListeSiteTravauxOperationComponent

          },
          {
            path: 'achat/:id',
            component: EditAchatComponent

          },
          {
            path: 'location/:id',
            component: EditLocationComponent

          },

          {
            path: 'loyer/:id',
            component: EditPaieLoyerComponent

          },
          {
            path: 'oeuvre/:id',
            component: EditMainDoeuvreComponent

          },
          {
            path: 'transport/:id',
            component: EditTransportComponent

          },
          {
            path: 'autre/:id',
            component: EditAutreDepenseComponent

          },

          {
            path: ':id/edite',
            component: EditSiteTravauxComponent,
          },
          {
            path: 'creer', component: EditSiteTravauxComponent,
          }

        ]

      }

    ]},
  { path: 'technique',
    children: [
      {path: '',
        component: TechniqueComponent,
        children: [
          {path: 'addImage/:id', component: AddImageComponent},
          {path: 'edite/:id', component: EditTecniqueComponent}
        ]},

    ]},
  { path: 'banque',
   // canActivate: [AuthGuardService],
    children: [{
      path: '',
      component: BanqueComponent,
      children: [
        {path: 'retrait', component: RetraitComponent}
      ]
    }
    ]

  },
  { path: 'salaire',
    //canActivate: [AuthGuardService],
    children: [{
      path: '',
      component: SalaireGesComponent
    }
    ]

  },
];
