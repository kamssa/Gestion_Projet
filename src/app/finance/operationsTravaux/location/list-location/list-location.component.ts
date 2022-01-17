import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DetailAchatTravaux} from "../../../../model/DtailAchat";
import {AchatTravaux} from "../../../../model/AchatTravaux";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AchatTravauxService} from "../../../../service/achat-travaux.service";
import {MatDialog} from "@angular/material/dialog";
import {DatailAchatDialogComponent} from "../../achat/dialogue/datail-achat-dialog/datail-achat-dialog.component";
import {LocationService} from "../../../../service/location.service";
import {DetailLocation} from "../../../../model/DetailLocation";
import {LocationTravaux} from "../../../../model/LocationTravaux";
import {DialogLocationComponent} from "../dialog-location/dialog-location.component";
import {EditAchatTravauxComponent} from "../../achat/edit-achat-travaux/edit-achat-travaux.component";
import {EditLocationTravauxComponent} from "../edit-detail/edit-location-travaux.component";

@Component({
  selector: 'app-list-location',
  templateUrl: './list-location.component.html',
  styleUrls: ['./list-location.component.scss']
})
export class ListLocationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<DetailLocation>;
  locations: LocationTravaux[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private locationService: LocationService,
              public dialog: MatDialog) {
  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    console.log(this.travauxId);
    this.locationService.getLocationByTravaux(this.travauxId)
      .subscribe( data => {
        this.locations = data;
        console.log(data);
        console.log(this.locations);
        this.locations.forEach(value => {
          console.log(value);
          let opp : LocationTravaux = value;
          this.receptacle.push(opp);

        });
        this.dataSource = this.receptacle;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    console.log(id);
    this.dialog.open(EditLocationTravauxComponent,{
      data: {
        locationTravaux: id
      }
    });
  }

  redirectToDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer l'achat ")) {
      this.locationService.supprimerLocation(id).subscribe(data => {
        //console.log('Voir la suppression', data);
      });
    }
  }

  public doFilter(event: Event){
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    this.dialog.open(DialogLocationComponent,{
      data: {
        locationTravaux: id
      }
    });
  }

}
