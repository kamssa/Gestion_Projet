import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AchatTravaux} from "../../../../model/AchatTravaux";
import {DetailLocation} from "../../../../model/DetailLocation";
import {LocationService} from "../../../../service/location.service";
import {LocationTravaux} from "../../../../model/LocationTravaux";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-location',
  templateUrl: './dialog-location.component.html',
  styleUrls: ['./dialog-location.component.scss']
})
export class DialogLocationComponent implements OnInit {
  displayedColumns: string[] = ['materiaux', 'montant', 'fournisseur'];
  dataSource: MatTableDataSource<DetailLocation>;
  receptacle: any = [];
  locationId: number;
  detailLocation: DetailLocation[] = [];
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private locationService: LocationService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              public dialogRef: MatDialogRef<DialogLocationComponent>,
              private snackBar: MatSnackBar,
              private router: Router) {
      this.locationId = data['locationTravaux'];
    this.locationService.getLocationById(data['locationTravaux']).subscribe(result => {
      console.log('resultat retourne', result);
      this.detailLocation = result.body.detailLocation;

      this.detailLocation.forEach(value => {
        console.log(value);
        let opp: DetailLocation = value;
        this.receptacle.push(opp);

      });
      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<DetailLocation>(this.receptacle);
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
    this.locationService.supprimerDetail(this.locationId, id).subscribe( data => {
      console.log('opération reussi', data);

      if (data){
        this.snackBar.open('Location supprimé avec succès!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,

        });
      }
      this.dialogRef.close();
      this.router.navigate(['finance/detail', this.locationId]);
    });
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
