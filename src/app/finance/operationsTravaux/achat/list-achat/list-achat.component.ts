import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import {DatailAchatDialogComponent} from "../dialogue/datail-achat-dialog/datail-achat-dialog.component";
import {EditAchatTravauxComponent} from "../edit-achat-travaux/edit-achat-travaux.component";
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-achat',
  templateUrl: './list-achat.component.html',
  styleUrls: ['./list-achat.component.scss']
})
export class ListAchatComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  listData: MatTableDataSource<any>;
  achats: AchatTravaux[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  array: any;
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   constructor(private serviceAchat: AchatTravauxService,
               public dialog: MatDialog,
               private router: Router) {
   }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.serviceAchat.getAchatTravauxByTravaux(this.travauxId).subscribe(list => {
      if(list.length !== 0){
        this.array = list.map(item => {
          return {
            id: item.id,
            ...item
          };
        });
      }else{
        console.log('aucune donnée');
      }

      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;


    });
     /* console.log(this.travauxId);
      this.serviceAchat.getAchatTravauxByTravaux(this.travauxId)
        .subscribe( data => {
          this.achats = data;
          console.log(data);

          console.log(this.achats);
        this.achats.forEach(value => {
          console.log(value);
          let opp : AchatTravaux = value;

          this.receptacle.push(opp);
        });
          this.dataSource = this.receptacle;
          this.dataSource = new MatTableDataSource<AchatTravaux>(this.receptacle);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      });
*/
   }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    this.dialog.open(EditAchatTravauxComponent,{
      data: {
        achatTravaux: id
      }
    });
  }

  redirectToDelete(row) {
    if (confirm("Voulez vous vraiment supprimer l'achat ")) {
      this.serviceAchat.supprimerUnAchat(row.id).subscribe(data => {
        this.router.navigate(['finance/achat', this.travauxId]);
    });
    }
    const index: number = this.array.indexOf(row);
    if (index !== -1) {
      this.array.splice(index, 1);
      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DatailAchatDialogComponent,{
      data: {
        achatTravaux: id
      }
    });
  }
}

