import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AutresService} from '../../../../service/autres.service';
import {Autres} from '../../../../model/Autres';
import {DetailAutres} from '../../../../model/DetailAutres';
import {DialogAutresComponent} from '../dialog-autres/dialog-autres.component';
import {Travaux} from '../../../../model/travaux';
import {ManagerService} from '../../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-autre-depense',
  templateUrl: './list-autre-depense.component.html',
  styleUrls: ['./list-autre-depense.component.scss']
})
export class ListAutreDepenseComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  autres: Autres[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  listData: MatTableDataSource<any>;
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private serviceAutre: AutresService,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              public dialog: MatDialog,
              private managerService: ManagerService,
              private helper: JwtHelperService,
              private router: Router,
              private notificationService: NotificationService) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    console.log(this.travauxId);
    this.serviceAutre.getautresByTravaux(this.travauxId)
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

    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER'){
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
      });

    }
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



  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

  }
  redirectToDelete(row) {
      if (confirm("Voulez vous vraiment supprimer la dépense ? ") ){
        this.serviceAutre.supprimerAutre(row.id).subscribe(data => {
          if(data.status === 0){
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array.splice(index, 1);
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
            this.notificationService.warn("Suppression avec succès") ;
            this.router.navigate(['finance/autre', this.travauxId]);
          }else {
            this.notificationService.warn("Le déboursé sec n\'est pas renseigné") ;
          }

        });
      }



  }


  openDialog(id: number) {
    this.dialog.open(DialogAutresComponent,{
      data: {
        autres: id
      }
    });
  }
}
