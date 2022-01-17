import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DetailAchatTravaux} from "../../../../model/DtailAchat";
import {AchatTravaux} from "../../../../model/AchatTravaux";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AchatTravauxService} from "../../../../service/achat-travaux.service";
import {MatDialog} from "@angular/material/dialog";
import {EditAchatTravauxComponent} from "../../achat/edit-achat-travaux/edit-achat-travaux.component";
import {DatailAchatDialogComponent} from "../../achat/dialogue/datail-achat-dialog/datail-achat-dialog.component";
import {MainOeuvre} from "../../../../model/MainOeuvre";
import {DetailMainOeuvre} from "../../../../model/DetailMainDoeuvre";
import {MainoeuvreService} from "../../../../service/mainoeuvre.service";
import {EditMainouvreTravauxComponent} from "../edit-mainouvre-travaux/edit-mainouvre-travaux.component";
import {DialogMainouvreComponent} from "../dialog-mainouvre/dialog-mainouvre.component";

@Component({
  selector: 'app-list-main-doeuvre',
  templateUrl: './list-main-doeuvre.component.html',
  styleUrls: ['./list-main-doeuvre.component.scss']
})
export class ListMainDoeuvreComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<DetailMainOeuvre>;
  mainOeuvres: MainOeuvre[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private mainoeuvreService: MainoeuvreService,
              public dialog: MatDialog) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.mainoeuvreService.getMainOeuvreByTravaux(this.travauxId)
      .subscribe( data => {
        this.mainOeuvres = data;
        console.log(data);
        console.log(this.mainOeuvres);
        this.mainOeuvres.forEach(value => {
          console.log(value);
          let opp : MainOeuvre = value;

          this.receptacle.push(opp);
        });
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<MainOeuvre>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    this.dialog.open(EditMainouvreTravauxComponent,{
      data: {
        mainOeuvres: id
      }
    });
  }

  redirectToDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer l'achat ")) {
      this.mainoeuvreService.supprimerMainOeuvre(id).subscribe(data => {
        //console.log('Voir la suppression', data);
      });
    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogMainouvreComponent,{
      data: {
        mainOeuvres: id
      }
    });
  }
}
