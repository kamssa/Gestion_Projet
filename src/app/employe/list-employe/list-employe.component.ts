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
import {AddEmployeComponent} from '../add-employe/add-employe.component';
import {ManagerService} from '../../service/manager.service';
import {AuthService} from '../../service/auth.service';
import {Departement} from '../../model/Departement';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';

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
  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  constructor(private employeService: EmployeService,
              public dialog: MatDialog, private authService: AuthService,
              private managerService: ManagerService,
              private  dialogService: DialogConfirmService,
              private _snackBar: MatSnackBar, private router: Router,
              private helper: JwtHelperService,
              private notificationService: NotificationService) {
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

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    if (this.ROLE_NAME === "ROLE_MANAGER"){
      this.employeService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul=> {
        console.log('verifier retour dialog open');
        this.employeService.employeCreer$
          .subscribe(result => {
            console.log(result.body);
            this.array.unshift(result.body);
            this.array = this.array;
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;


          });
      });
    }else {
      this.error = 'vous n\'êtes pas autorisé !';
    }

  }

  onEdit(row){
    if(this.ROLE_NAME === "ROLE_MANAGER"){
      this.employeService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul => {

        this.employeService.employeModif$
          .subscribe(result => {
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array[index] = result.body;
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
          });
      });
    }else {
      this.error = 'vous n\'êtes pas autorisé !';
    }

  }

  onDelete(row){
    if(this.ROLE_NAME === "ROLE_MANAGER"){
      if(confirm('Voulez-vous vraiment supprimer le departement ?')){
        this.employeService.deleteEmployeById(row.id).subscribe(result => {
          console.log(result);
        });
        this.notificationService.warn('Suppression avec succès');

      }
      const index: number = this.array.indexOf(row);
      if (index !== -1) {
        this.array.splice(index, 1);
        this.listData = new MatTableDataSource(this.array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log('Affiche Voici mon tableau', index);

      }
    }else {
      this.error = 'vous n\'êtes pas autorisé !';
    }

  }
}
