import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {AdminService} from '../../service/admin.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CaisseService} from '../../service/caisse.service';
import {EditOperationComponent} from '../../banque/edit-operation/edit-operation.component';
import {EditOperationCaisseComponent} from '../edit-operation-caisse/edit-operation-caisse.component';

@Component({
  selector: 'app-list-caisse',
  templateUrl: './list-caisse.component.html',
  styleUrls: ['./list-caisse.component.scss']
})
export class ListCaisseComponent implements OnInit {
  displayedColumns: string[] = ['date', 'designation', 'montant',  'employe' , 'actions'];
  listData: MatTableDataSource<any>;

  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  roles: [];
  array: any;
  ROLE_ADMIN: any;
  ROLE_NAME: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;
  constructor(
              private  caisseService: CaisseService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private adminService: AdminService,
              private helper: JwtHelperService) {
  }
  ngOnInit(): void {

  }

  onCreate() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditOperationCaisseComponent, dialogConfig);

  }

  applyFilter() {

  }

  onSearchClear() {

  }

  onEdit(row: any) {

  }

  onDelete(row: any) {

  }


}
