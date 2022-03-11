import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Observable, Subscription} from 'rxjs';
import {Travaux} from '../../../model/travaux';
import {switchMap} from 'rxjs/operators';
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddCategorieComponent} from '../../../categorie/add-categorie/add-categorie.component';
import {MatTableDataSource} from '@angular/material/table';
import {UpdateProjetComponent} from '../update-projet/update-projet.component';
import {AddTravauxSiteComponent} from '../add-travaux-site/add-travaux-site.component';

@Component({
  selector: 'app-liste-site-travaux-operation',
  templateUrl: './liste-site-travaux-operation.component.html',
  styleUrls: ['./liste-site-travaux-operation.component.scss']
})
export class ListeSiteTravauxOperationComponent implements OnInit{
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
  achat() {
    this.edit = 0;
  }
  loyer() {
    this.edit = 4;
  }

  ouvre() {
    this.edit = 3;
  }

  transport() {
    this.edit = 5;
  }

  autre() {
    this.edit = 6;
   }

  location() {
    this.edit = 2;
  }
  autreachat() {
    this.edit = 7;
  }
  montantChange($event) {
    if ($event){
      this.achatTravauxService.travauxCreer$.subscribe(
        result => {

          this.travauxService.getTravauxById(this.travauxId).subscribe(res => {
          this.travaux = res.body;
          console.log('Voir le reste ', res.body);
          });
        }
      );
    this.achatTravauxService.travauxSupprime$
      .subscribe(data => {
        this.travauxService.getTravauxById(this.travauxId).subscribe(res => {
          this.travaux = res.body;
          console.log('Voir le reste ', res.body);
        });
      });

    }

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

  add(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialog.open(AddTravauxSiteComponent,
      {

        data: {
          dialogConfig,
          site: id
        }
      });

  }
}

