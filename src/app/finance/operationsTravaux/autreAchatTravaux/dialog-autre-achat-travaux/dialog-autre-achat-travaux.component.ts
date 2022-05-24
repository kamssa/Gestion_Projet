import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DetailAutreAchatTravaux} from '../../../../model/DetailAutreAchatTravaux';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-autre-achat-travaux',
  templateUrl: './dialog-autre-achat-travaux.component.html',
  styleUrls: ['./dialog-autre-achat-travaux.component.scss']
})
export class DialogAutreAchatTravauxComponent implements OnInit {
  displayedColumns: string[] = ['materiaux', 'prix_unitaire', 'quantite', 'montant'];
  dataSource: MatTableDataSource<DetailAutreAchatTravaux>;
  receptacle: any = [];
  achatTravauxId: number;
  detailAutreAchatTravaux: DetailAutreAchatTravaux[] = [];
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: string;
  constructor(private serviceAchat: AutreAchatTravauxService,
              @Inject(MAT_DIALOG_DATA) public data: AutreAchatTravaux,
              public dialogRef: MatDialogRef<DialogAutreAchatTravauxComponent>,
              private snackBar: MatSnackBar,
              private router: Router) {

    this.serviceAchat.getAutreAchatTravauxById(data['autreAchatTravaux']).subscribe(result => {
      console.log('resultat retourne', result.body);
      this.detailAutreAchatTravaux = result.body.detailAutreAchatTravaux;

      this.detailAutreAchatTravaux.forEach(value => {
        console.log(value);
        let opp : DetailAutreAchatTravaux = value;
        this.receptacle.push(opp);
      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailAutreAchatTravaux>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }
  ngOnInit() {

  }

  redirectToDelete(id: number) {
    console.log( 'id de detail achat', id);
    console.log('Id de achat', this.achatTravauxId);
    this.serviceAchat.supprimerDetail(this.achatTravauxId, id).subscribe( data => {
      if (data){
        this.snackBar.open('Achat supprimé avec succès!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
      this.dialogRef.close();
      this.router.navigate(['finance/detail', this.achatTravauxId]);
    });
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
