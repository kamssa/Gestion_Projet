import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Employe} from '../../model/Employe';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeService} from '../../service/employe.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddEmployeComponent} from '../add-employe/add-employe.component';
import {ManagerService} from '../../service/manager.service';
import {AuthService} from '../../service/auth.service';
import {UpdatEmployeComponent} from '../updat-employe/updat-employe.component';
import {AddDepComponent} from '../../dep/add-dep/add-dep.component';
import {Departement} from '../../model/Departement';
import {Personne} from '../../model/personnes';

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'service', 'actions'];
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
  constructor(private employeService: EmployeService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router) {
  }
  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(list => {
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
    this.employeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEmployeComponent, dialogConfig);
  }

  onEdit(row){
    this.employeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddEmployeComponent, dialogConfig);
  }

  onDelete(id){
    /* this.employeService.getEmployeByIdDepartement(id)
       .subscribe(data => {
         this.employes = data.body;
         console.log('taille de employe', this.employes.length);
         if(this.employes.length===0){
           if(confirm('Voulez-vous vraiment supprimer le departement ?')){
             this.departementService.supprimerDepartement(id).subscribe(result => {
               console.log(result);
             });
             this.notificationService.warn('Suppression avec succès');
           }
         }else{
           this.notificationService.warn('Supprimer d\'abord les employés');
         }

       })
 */
  }
}
