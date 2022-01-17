import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DetailTransport} from '../../../../model/DetailTransport';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TransportService} from '../../../../service/transport.service';
import {MatDialog} from '@angular/material/dialog';
import {EditTranspTravauxComponent} from '../edit-detail/edit-transp-travaux.component';
import {Transport} from '../../../../model/Transport';
import {DialogTransportComponent} from "../dialog-transport/dialog-transport.component";

@Component({
  selector: 'app-list-transport',
  templateUrl: './list-transport.component.html',
  styleUrls: ['./list-transport.component.scss']
})
export class ListTransportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  dataSource: MatTableDataSource<DetailTransport>;
  transports: Transport[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private serviceTransport: TransportService,
              public dialog: MatDialog) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.serviceTransport.getTransportByTravaux(this.travauxId)
      .subscribe( data => {
        this.transports = data;
        console.log(data);
        console.log(this.transports);
        this.transports.forEach(value => {
          console.log(value);
          let opp : DetailTransport = value;

          this.receptacle.push(opp);
        });
        this.dataSource = this.receptacle;
        this.dataSource = new MatTableDataSource<DetailTransport>(this.receptacle);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    console.log(id);
    this.dialog.open(EditTranspTravauxComponent,{
      data: {
        transport: id
      }
    });
  }

  redirectToDelete(id: number) {
    if (confirm("Voulez vous vraiment supprimer l'achat ")) {
      this.serviceTransport.supprimerTransport(id).subscribe(data => {

      });
    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogTransportComponent,{
      data: {
        transport: id
      }
    });
  }
}
