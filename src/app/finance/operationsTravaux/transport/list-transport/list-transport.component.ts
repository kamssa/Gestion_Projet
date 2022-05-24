import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {DetailTransport} from '../../../../model/DetailTransport';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TransportService} from '../../../../service/transport.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {EditTranspTravauxComponent} from '../edit-detail/edit-transp-travaux.component';
import {Transport} from '../../../../model/Transport';
import {DialogTransportComponent} from "../dialog-transport/dialog-transport.component";
import {Travaux} from '../../../../model/travaux';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-transport',
  templateUrl: './list-transport.component.html',
  styleUrls: ['./list-transport.component.scss']
})
export class ListTransportComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  transports: Transport[] = [];
  receptacle: any = [];
  listData: MatTableDataSource<any>;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  @ViewChild(MatSort) sort: MatSort;

  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private serviceTransport: TransportService,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              public dialog: MatDialog,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              private router: Router) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.serviceTransport.getTransportByTravaux(this.travauxId)
      .subscribe( list => {
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

  redirectToDelete(row) {
    if (confirm("Voulez vous vraiment supprimer le transport ?")) {
      this.serviceTransport.supprimerTransport(row.id).subscribe(data => {
        if(data.status === 0){
          const index: number = this.array.indexOf(row);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;

          }
          this.notificationService.warn("Suppression avec succès") ;
          this.router.navigate(['finance/transport', this.travauxId]);
        }else {
          this.notificationService.warn("Le déboursé sec n\'est pas renseigné") ;
        }
      });
    }
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogTransportComponent,{
      data: {
        transport: id
      }
    });
  }
}
