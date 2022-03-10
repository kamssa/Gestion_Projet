import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Manager} from '../../model/Manager';
import {Employe} from '../../model/Employe';
import {ManagerService} from '../../service/manager.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../service/employe.service';
import {StockService} from '../../service/stock.service';

import {DetailStockService} from '../../service/detail-stock.service';
import {DetailStock} from '../../model/DetailStock';
import {DetailHistoryService} from '../../service/detail-history.service';
import {DetailStockHistory} from '../../model/DetailStockHistory';
import {AddMaterielComponent} from '../../materiel/add-materiel/add-materiel.component';
import {EditStockComponent} from '../edit-stock/edit-stock.component';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss']
})
export class ListStockComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'quantite',  'total', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  detailStock: DetailStock;
  personne: any;
  array: any;
  roles: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  id: number;
  detailStockHistory: DetailStockHistory[];
  constructor(private detailStockService: DetailStockService,
              private stockService: StockService,
              private detailHistoryService: DetailHistoryService,
              private managerService: ManagerService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private helper: JwtHelperService,
              private employeService: EmployeService,
              private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER'){
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
        this.personne = resultat.body;

        if (this.personne.type === 'MANAGER'){
          this.managerService.getManagerById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;
            this.route.params.subscribe(params => {
              this.id = +params['id'];
              this.stockService.getStockentreByIdEntreprise(this.id).subscribe(list => {

                if (list.body.length === 0){
                  this.notificationService.warn('Pas d\'articles enregistrés !') ;

                }else if (list.body.length > 0){

                  this.array = list.body.map(item => {

                    return {
                      id: item.id,
                      ...item
                    };
                  });

                  this.listData = new MatTableDataSource(this.array);
                  this.listData.sort = this.sort;
                  this.listData.paginator = this.paginator;
                  this.listData.filterPredicate = (data, filter) => {
                    return this.displayedColumns.some(ele => {
                      return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
                    });
                  };

                }
              });
            });

          });
        }else if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
              this.detailStockService.getAllDetailStock().subscribe(list => {
                this.array = list.body.map(item => {
                  return {
                    id: item.id,
                    ...item
                  };
                });
                this.listData = new MatTableDataSource(this.array);
                this.listData.sort = this.sort;
                this.listData.paginator = this.paginator;
                this.listData.filterPredicate = (data, filter) => {
                  return this.displayedColumns.some(ele => {
                    return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
                  });
                };

              });
            });

        }

      });

    }
    if (localStorage.getItem('currentUser')) {
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

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate(ev) {

    if (this.ROLE_NAME === 'ROLE_MANAGER'){
      ev = this.personne.entreprise.id;
      this.router.navigate(['/detailStock', ev]);
    }else if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onEdit(row){
    if (this.ROLE_NAME === 'ROLE_MANAGER'){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(EditStockComponent, {
        data: {
          stock: row.id
        }

      });
    }else if (this.ROLE_NAME === 'ROLE_EMPLOYE') {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }
  }

  onDelete(row){
    if (this.ROLE_NAME === 'ROLE_MANAGER') {

      if (confirm('Voulez-vous vraiment supprimer un élément du stock ?')){
        this.stockService.supprimerStock(row.id).subscribe(result => {
        if(result.status === 0){
          this.notificationService.warn('Suppression avec succès');
          const index: number = this.array.indexOf(row);
          if (index !== -1) {
            this.array.splice(index, 1);
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;


          }
        }else {
          this.notificationService.warn('Suppression impossible');
        }

        });


      }

    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onArticle(row: any) {
    console.log(row.id);
    this.router.navigate(['/detailStockHistory', row.id]);
  }
}
