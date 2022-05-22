import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Travaux} from '../../../model/travaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {switchMap} from 'rxjs/operators';
import {UpdateProjetComponent} from '../../../finance/siteTravaux/update-projet/update-projet.component';
import {ManagerService} from '../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AutresService} from '../../../service/autres.service';
import {UpdateEvolutionService} from '../../../service/update-evolution.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.scss']
})
export class ListProjetComponent implements OnInit {
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  travaux: Travaux;
  travauxId: number;
  solde: number;
  panelOpenState = false;
  travaux$: Observable<Travaux>;
  montant: number;
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  constructor(private route: ActivatedRoute,
              private managerService: ManagerService,
              private autresService: AutresService,
              private travauxService: SteTravauxService,
              private  router: Router,
              private mediaObserver: MediaObserver,
              private helper: JwtHelperService,
              public dialog: MatDialog,
              private updateEvolutionService: UpdateEvolutionService) {

  }
  ngOnInit(): void {
    this.refreshData();
     setInterval(() => {
      this.refreshData();
    }, 3000);
  }
  refreshData(){
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        if (this.personne.type === 'MANAGER') {
          this.managerService.getManagerById(this.personne.id).subscribe(res => {
            this.personne = res.body;
          });
        }
      });
    }

    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.devicesXs = result.mqAlias === 'xs' ? true : false;
      });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.travauxService.getTravauxById(+params.get('id')))
    ).subscribe(result => {
      this.travaux = result.body;
      this.travauxId = result.body.id;
    });
  }
  update(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(UpdateProjetComponent,
      {

        data: {
          dialogConfig,
          travaux: id
        }
      });
  }
  onAchat(travail: Travaux) {
    this.router.navigate(['finance/achat', travail.id]);
  }

  onLocation(travail: Travaux) {
    this.router.navigate(['finance/location', travail.id]);

  }
  // tslint:disable-next-line:typedef
  updateEvolution(id) {
    this.updateEvolutionService.getEvolution(id)
      .subscribe(result => {
        this.travaux = result.body;
        this.travauxId = result.body.id;
      });

  }


  onLoyer(travail: Travaux) {
    this.router.navigate(['finance/loyer', travail.id]);

  }

  onOeuvre(travail: Travaux) {
    this.router.navigate(['finance/oeuvre', travail.id]);

  }

  onTransport(travail: Travaux) {
    this.router.navigate(['finance/transport', travail.id]);

  }

  onAutres(travail: Travaux) {
    this.router.navigate(['finance/autre', travail.id]);
  }
}
