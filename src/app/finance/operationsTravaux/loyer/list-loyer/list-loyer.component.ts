import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DetailLoyer} from "../../../../model/DetailLoyer";
import {Loyer} from "../../../../model/Loyer";
import {LoyService} from "../../../../service/loy.service";
import {DialogLoyerComponent} from "../dialog-loyer/dialog-loyer.component";
import {EditPaieLoyerComponent} from "../edit-paie-loyer/edit-paie-loyer.component";
import {DetailLoyerComponent} from "../detail-loyer/detail-loyer.component";
import {Travaux} from '../../../../model/travaux';
import {ManagerService} from '../../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-loyer',
  templateUrl: './list-loyer.component.html',
  styleUrls: ['./list-loyer.component.scss']
})
export class ListLoyerComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];

  loyer: Loyer[] = [];
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
  constructor(private loyerService: LoyService,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              public dialog: MatDialog,
              private managerService: ManagerService,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              private router: Router) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.loyerService.getLoyerByTravaux(this.travauxId)
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
    console.log(id);
    this.dialog.open(DetailLoyerComponent,{
      data: {
        loyer: id
      }
    });
  }

  redirectToDelete(row) {
    if (confirm("Voulez vous vraiment supprimer le loyer ")) {
      this.loyerService.supprimerLoyer(row.id).subscribe(data => {
        if(data.status === 0){
          const index: number = this.array.indexOf(row);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;

          }
          this.notificationService.warn("Suppression avec succès") ;
          this.router.navigate(['finance/loyer', this.travauxId]);
        }else {
          this.notificationService.warn("Le déboursé sec n\'est pas renseigné") ;
        }
      });
    }
  }

  public doFilter(event: Event){
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    this.dialog.open(DialogLoyerComponent,{
      data: {
        loyer: id
      }
    });
  }

}
