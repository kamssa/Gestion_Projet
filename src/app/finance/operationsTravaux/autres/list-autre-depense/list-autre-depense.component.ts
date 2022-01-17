import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DetailAchatTravaux} from '../../../../model/DtailAchat';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AutresService} from '../../../../service/autres.service';
import {Autres} from '../../../../model/Autres';
import {DetailAutres} from '../../../../model/DetailAutres';
import {DialogAutresComponent} from '../dialog-autres/dialog-autres.component';

@Component({
  selector: 'app-list-autre-depense',
  templateUrl: './list-autre-depense.component.html',
  styleUrls: ['./list-autre-depense.component.scss']
})
export class ListAutreDepenseComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<DetailAutres>;
  autres: Autres[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private serviceAutre: AutresService,
              public dialog: MatDialog) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.serviceAutre.getautresByTravaux(this.travauxId)
      .subscribe( data => {
        this.autres = data;
        console.log(data);
        console.log(this.autres);
        this.autres.forEach(value => {
          console.log(value);
          let opp : AchatTravaux = value;

          this.receptacle.push(opp);
        });
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<DetailAutres>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    this.dialog.open(DialogAutresComponent,{
      data: {
        autres: id
      }
    });
  }

  redirectToDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer la dépense ? ")) {
      this.serviceAutre.supprimerAutre(id).subscribe(data => {
      });
    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogAutresComponent,{
      data: {
        autres: id
      }
    });
  }
}
