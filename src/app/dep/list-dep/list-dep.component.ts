import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Employe} from '../../model/Employe';
import {DepService} from '../../service/dep.service';
import {EmployeService} from '../../service/employe.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {Personne} from '../../model/personnes';

@Component({
  selector: 'app-list-dep',
  templateUrl: './list-dep.component.html',
  styleUrls: ['./list-dep.component.scss']
})
export class ListDepComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'description', 'actions'];
  listData: MatTableDataSource<any>;
  departements: Departement[];
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  employes: Employe[];
  personne: Personne;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(private departementService: DepService,
              private adminService: AdminService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,

              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.departementService.getAllDepartement().subscribe(list => {
      console.log(list);
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
   /* if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        console.log(this.personne);
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = this.ROLE_ADMIN.name;
        });
      });

    }*/
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.departementService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onEdit(row){
    this.departementService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddDepComponent, dialogConfig);
  }

  onDelete(id){

      this.dialogService.openConfirmDialog('Voulez-vous supprimer le depaterment? ?')
        .afterClosed().subscribe(res => {
        if (res){
          console.log(res);
          this.departementService.supprimerDepartement(id).subscribe(data => {
            this._snackBar.open('departement supprimé avec succès!', '', {
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: 'bottom',

            });
          });

        }
      });
      this.router.navigate(['departement']);
  }
}
