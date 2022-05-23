import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Travaux} from '../../../../model/travaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SteTravauxService} from '../../../../service/ste-travaux.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {switchMap} from 'rxjs/operators';
import {CumulDepensesComponent} from '../../cumul-depenses/cumul-depenses.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-autre-achat-travaux',
  templateUrl: './edit-autre-achat-travaux.component.html',
  styleUrls: ['./edit-autre-achat-travaux.component.scss']
})
export class EditAutreAchatTravauxComponent implements OnInit {
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  travaux: Travaux;
  travauxId: number;
  solde: number;
  total: number;
  panelOpenState = false;
  constructor(private route: ActivatedRoute,
              private travauxService: SteTravauxService, private  router: Router,
              private mediaObserver: MediaObserver,
              private achatService: AchatTravauxService,
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

    });
  }

  getTravauxById() {
    this.travauxService.getTravauxById(this.id).subscribe(res => {
      this.travaux = res.body;
    });
  }

  autreAchat() {
    this.edit = 7;
  }

  onCumulDepense(id: number) {
    console.log(id);
    this.dialog.open(CumulDepensesComponent,{
      data: {
        travaux: id
      }
    });


  }
}
