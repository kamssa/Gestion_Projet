import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Employe} from '../../model/Employe';
import {DepService} from '../../service/dep.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDepComponent} from '../add-dep/add-dep.component';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {AdminService} from '../../service/admin.service';
import {Personne} from '../../model/Personne';
import {ManagerService} from '../../service/manager.service';
import {Manager} from '../../model/Manager';

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

  personne: any;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  constructor(private departementService: DepService,
              private managerService: ManagerService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private helper: JwtHelperService)
  {

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
      this.departementService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddDepComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul=> {
        console.log('verifier retour dialog open');
        this.departementService.depCreer$
          .subscribe(result => {
            console.log(result.body);
            this.array.unshift(result.body);
            this.array = this.array;
            this.listData = new MatTableDataSource(this.array);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;


          });
      });
    }else if (this.ROLE_NAME === "ROLE_EMPLOYE"){
      this.error = 'vous n\'êtes pas autorisé !';
    }

  }

  onEdit(row){
    if (this.ROLE_NAME === "ROLE_MANAGER"){
      this.departementService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      const dialogRef = this.dialog.open(AddDepComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(resul => {
        console.log('verifier retour dialog update');
        this.departementService.depModif$
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
    }else if (this.ROLE_NAME === "ROLE_EMPLOYE") {
      this.error = 'vous n\'êtes pas autorisé !';
    }

  }

  onDelete(row){
    if (this.ROLE_NAME === "ROLE_MANAGER") {
      if(confirm('Voulez-vous vraiment supprimer le departement ?')){
        this.departementService.supprimerDepartement(row.id).subscribe(result => {
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
