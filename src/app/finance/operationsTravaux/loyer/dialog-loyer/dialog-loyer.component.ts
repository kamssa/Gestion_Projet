import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoyService} from '../../../../service/loy.service';
import {DetailLoyer} from "../../../../model/DetailLoyer";
import {Loyer} from "../../../../model/Loyer";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dialog-loyer',
  templateUrl: './dialog-loyer.component.html',
  styleUrls: ['./dialog-loyer.component.scss']
})
export class DialogLoyerComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'montant'];
  dataSource: MatTableDataSource<DetailLoyer>;
  receptacle: any = [];
  detailLoyer: DetailLoyer[] = [];
  loyerId: number;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private serviceLoyer: LoyService,
              @Inject(MAT_DIALOG_DATA) public data: Loyer,
              public dialogRef: MatDialogRef<DialogLoyerComponent>,
              private snackBar: MatSnackBar,
              private router: Router) {
      this.loyerId = data['loyer'];
      this.serviceLoyer.getLoyerById(data['loyer']).subscribe(result => {
      console.log('resultat retourne', result);
      this.detailLoyer = result.body.detailLoyer;

      this.detailLoyer.forEach(value => {
        console.log(value);
        let opp: DetailLoyer = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailLoyer>(this.receptacle);
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
    console.log(id);
    this.serviceLoyer.supprimerDetail(this.loyerId, id).subscribe( data => {

      if (data){
        this.snackBar.open('Loyer supprimé avec succès!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
      this.dialogRef.close();
      this.router.navigate(['finance/detail', this.loyerId]);
    });
  }

  public doFilter(event: Event) {
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
