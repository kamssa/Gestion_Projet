import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AchatTravauxService} from '../../../service/achat-travaux.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AchatTravaux} from '../../../model/AchatTravaux';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DetailAchatTravaux} from '../../../model/DtailAchat';
import {MatTableDataSource} from '@angular/material/table';
import {DatailAchatDialogComponent} from '../achat/dialogue/datail-achat-dialog/datail-achat-dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DetailMainOeuvre} from '../../../model/DetailMainDoeuvre';
import {MainoeuvreService} from '../../../service/mainoeuvre.service';
import {MainOeuvre} from '../../../model/MainOeuvre';
import {DialogMainouvreComponent} from '../mainouvre/dialog-mainouvre/dialog-mainouvre.component';
import {Travaux} from '../../../model/travaux';

@Component({
  selector: 'app-cumul-depenses',
  templateUrl: './cumul-depenses.component.html',
  styleUrls: ['./cumul-depenses.component.scss']
})
export class CumulDepensesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'nom',  'salaire', 'nombreJour', 'montantVerser' ];
  displayedColumns1: string[] = ['materiaux', 'prix_unitaire', 'quantite', 'montant', 'delete'];
  dataSource: MatTableDataSource<DetailMainOeuvre>;
  receptacle: any = [];
  dataSource1: MatTableDataSource<DetailAchatTravaux>;
  receptacle1: any = [];
  detailMainOeuvre: DetailMainOeuvre[] = [];
  detailAchatTravaux: DetailAchatTravaux[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private mainoeuvreService: MainoeuvreService,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              public dialogRef: MatDialogRef<DialogMainouvreComponent>,
              private snackBar: MatSnackBar,
              private router: Router, private serviceAchat: AchatTravauxService) {

    this.mainoeuvreService.getDetailMainOeuvreByTravaux(this.data['travaux']).subscribe(result => {
      this.detailMainOeuvre = result;
      this.detailMainOeuvre.forEach(value => {
        console.log(value);
        let opp : DetailMainOeuvre = value;
        // this.dataSource = opp;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailMainOeuvre>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.serviceAchat.getAchatTravauxById(data['achatTravaux']).subscribe(result => {
      console.log('resultat retourne', result);
      this.detailAchatTravaux = result.body.detailAchatTravaux;

      this.detailAchatTravaux.forEach(value => {
        console.log(value);
        let opp : DetailAchatTravaux = value;
        this.receptacle1.push(opp);
      });
      this.dataSource1 = this.receptacle;
      this.dataSource1 = new MatTableDataSource<DetailAchatTravaux>(this.receptacle);

    });

  }
  ngOnInit(): void {
  }

}
