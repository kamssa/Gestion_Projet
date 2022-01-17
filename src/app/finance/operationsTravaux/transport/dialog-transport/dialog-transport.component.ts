import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DetailTransport} from "../../../../model/DetailTransport";
import {TransportService} from "../../../../service/transport.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dialog-transport',
  templateUrl: './dialog-transport.component.html',
  styleUrls: ['./dialog-transport.component.scss']
})
export class DialogTransportComponent implements OnInit {
  displayedColumns: string[] = ['libelle' , 'montant', 'delete'];
  dataSource: MatTableDataSource<DetailTransport>;
  receptacle: any = [];
  detailTransport: DetailTransport[] = [];
  transportId: number;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private transportService: TransportService,
              @Inject(MAT_DIALOG_DATA) public data: Transport,
              public dialogRef: MatDialogRef<DialogTransportComponent>,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.transportId = data['transport'];
    this.transportService.getTransportById(data['transport']).subscribe(result => {
      console.log('resultat retourne', result);
      this.detailTransport = result.body.detailTransport;

      this.detailTransport.forEach(value => {
        console.log(value);
        let opp : DetailTransport = value;
        // this.dataSource = opp;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailTransport>(this.receptacle);
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
    this.transportService.supprimerDetail(this.transportId, id).subscribe( data => {

      if (data){
        this.snackBar.open('Transport supprimé avec succès!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
      this.dialogRef.close();
      this.router.navigate(['finance/detail', this.transportId]);
    });
  }

  public doFilter(event: Event) {
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
