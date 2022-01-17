import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EditLocationTravauxComponent} from "../../location/edit-detail/edit-location-travaux.component";
import {DialogLocationComponent} from "../../location/dialog-location/dialog-location.component";
import {DetailLoyer} from "../../../../model/DetailLoyer";
import {Loyer} from "../../../../model/Loyer";
import {LoyService} from "../../../../service/loy.service";
import {DialogLoyerComponent} from "../dialog-loyer/dialog-loyer.component";
import {EditPaieLoyerComponent} from "../edit-paie-loyer/edit-paie-loyer.component";
import {DetailLoyerComponent} from "../detail-loyer/detail-loyer.component";

@Component({
  selector: 'app-list-loyer',
  templateUrl: './list-loyer.component.html',
  styleUrls: ['./list-loyer.component.scss']
})
export class ListLoyerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<DetailLoyer>;
  loyer: Loyer[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private loyerService: LoyService,
              public dialog: MatDialog) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.loyerService.getLoyerByTravaux(this.travauxId)
      .subscribe( data => {
        this.loyer = data;
        console.log(data);
        console.log(this.loyer);
        this.loyer.forEach(value => {
          console.log(value);
          let opp : Loyer = value;
          this.receptacle.push(opp);

        });
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<Loyer>(this.receptacle);
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
    this.dialog.open(DetailLoyerComponent,{
      data: {
        loyer: id
      }
    });
  }

  redirectToDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer l'achat ")) {
      this.loyerService.supprimerLoyer(id).subscribe(data => {

      });
    }
  }

  public doFilter(event: Event){
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    this.dialog.open(DialogLoyerComponent,{
      data: {
        loyer: id
      }
    });
  }

}
