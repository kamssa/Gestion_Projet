import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Travaux} from '../../../model/travaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {switchMap} from 'rxjs/operators';
import {UpdateProjetComponent} from '../../../finance/siteTravaux/update-projet/update-projet.component';

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
  constructor(private route: ActivatedRoute,
              private travauxService: SteTravauxService,
              private  router: Router,
              private mediaObserver: MediaObserver,
              private achatTravauxService: AchatTravauxService,
              public dialog: MatDialog) {

  }
  ngOnInit(): void {
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
      console.log(result.body);
    });
  }
  update(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialog.open(UpdateProjetComponent,
      {

        data: {
          dialogConfig,
          travaux: id
        }
      });
    this.travauxService.travauxModif$
      .subscribe(result => {
        if (result.status === 0){
          this.travaux = result.body;
        }

      });



  }

}
