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

@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'email', 'telephone', 'actions'];
  listData: MatTableDataSource<any>;
  employes: Employe[];
  employe: Employe;
  receptacle: any = [];
  array: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(private employeService: EmployeService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(list => {
      if(list.status === 0){
        this.array = list.body.map(item => {
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
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
        });
      };

    });
    /*if(localStorage.getItem('currentUser')) {
      let token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.adminService.getAdminById(decoded.sub).subscribe(res => {
        this.admin = res.body;
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
    const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
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
  }

  onEdit(row){
    this.employeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AddEmployeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('verifier retour dialog update');
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
  }

  onDelete(row){
    if(confirm('Voulez-vous vraiment supprimer le client ?')){
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
      console.log('Affiche Voici mon tableau', index)

    }
  }

}
