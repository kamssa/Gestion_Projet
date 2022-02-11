import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CategorieService} from '../service/categorie.service';
import {Categorie} from '../model/Categorie';
import {StockService} from '../service/stock.service';
import {MatTableDataSource} from '@angular/material/table';
import {Manager} from '../model/Manager';
import {Employe} from '../model/Employe';
import {ManagerService} from '../service/manager.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogConfirmService} from '../helper/dialog-confirm.service';
import {NotificationService} from '../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Departement} from '../model/Departement';
import {MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeService} from '../service/employe.service';
import {AddStockComponent} from './add-stock/add-stock.component';
import {EditStockComponent} from './edit-stock/edit-stock.component';
import {Stock} from '../model/Stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  displayedColumns: string[] = ['categorie', 'total', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 montant: number;
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
  stock: Stock;
  stocks: Stock[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private router: Router,
              private categorieService: CategorieService,
              private stockService: StockService,
              private managerService: ManagerService,
              public dialog: MatDialog,
              private helper: JwtHelperService,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private employeService: EmployeService,
  ) { }

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
            this.stockService.getStockByIdEntreprise(this.personne.entreprise.id).subscribe(list => {

              this.array = list.body.map(item => {
                return {
                  id: item.id,
                  montant: item.montant,
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
        }else if (this.personne.type === 'EMPLOYE'){
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;
              this.stockService.getStockByIdEntreprise(this.personne.departement.entreprise.id).subscribe(list => {

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
  }
  openCategorie(row: any) {
    console.log(row.id);
    this.router.navigate(['/detailStock', row.id]);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
  }
  onCreate() {
    if (this.ROLE_NAME === 'ROLE_MANAGER'){
      this.router.navigate(['/detailStock']);
    }else if (this.ROLE_NAME === 'ROLE_EMPLOYE'){
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  onEdit(row){

  }

  onDelete(row){

  }

  onDetaiStock(row: any) {
    console.log(row);
  }
}
